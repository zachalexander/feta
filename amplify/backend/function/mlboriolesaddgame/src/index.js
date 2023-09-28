
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = 'https://443foga42zglvpyr6erc7rh3l4.appsync-api.us-east-1.amazonaws.com/graphql';
const GRAPHQL_API_KEY = 'da2-d237viicnjbmphh333shl54iku';

async function formatDate(date) {
    console.log(date)
    const day = date.substring(3, 5)
    const month = date.substring(0, 2)
    const year = date.substring(6, 10)
    return `${year}-${month}-${day}`;
}

async function getTodaysOrioleGameData(date) {
    let mlbdata = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}&teamId=110`).then(data => data.json());
    return mlbdata['dates'][0]['games'][0];
}

async function liveGameData(gamePk) {
    console.log(gamePk)
    let liveData = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`).then(data => data.json())
    return liveData;
}

async function createLiveData(data) {
    let playData = {};
    let updatedData = [];
    let gamepk = data.gameData.game.pk;
    let currentPlay = data.liveData.plays.currentPlay;
    let startingGameData = data.gameData;
    let finalData = data.liveData.decisions;

    playData["initialGameData"] = startingGameData
    playData["finalData"] = data.liveData.decisions
    playData["currentPlay"] = currentPlay;

    updatedData.push(playData);
    return JSON.stringify(updatedData)
}

export const handler = async (event) => {
    const today = new Date().toLocaleString('en', { year: 'numeric', day: '2-digit', month: '2-digit', timeZone: 'America/New_York' });
    const formatted_date = await formatDate(today);
    const data = await getTodaysOrioleGameData(formatted_date);

    const gamePk = data['gamePk']
    const homeTeam = data['teams']['home']['team']['name']
    const awayTeam = data['teams']['away']['team']['name']
    const awayTeamWins = data['teams']['away']['leagueRecord']['wins'].toString()
    const awayTeamLosses = data['teams']['away']['leagueRecord']['losses'].toString()
    const homeTeamWins = data['teams']['home']['leagueRecord']['wins'].toString()
    const homeTeamLosses = data['teams']['home']['leagueRecord']['losses'].toString()
    const awayTeamLogoSlug = awayTeam.split(" ").join("-").toLowerCase();
    const homeTeamLogoSlug = homeTeam.split(" ").join("-").toLowerCase();
    const startTime = data['gameDate']
    const gameStatus = data['status']['detailedState']
    const now = new Date().toISOString()
    const sport = 'baseball'

    const liveGame = await liveGameData(gamePk)
    const livePlays = await createLiveData(liveGame)

    let gameStarted;
    if (startTime > now) {
        gameStarted = 'false'
    } else {
        gameStarted = 'true'
    }

    let gameEnded;
    if (gameStatus === 'Final') {
        gameEnded = 'true'
    } else {
        gameEnded = 'false'
    }

    const query_create_item = `mutation createSportsGameTable($input: CreateSportsGameInput = {
        id: ${JSON.stringify(gamePk)},
        lastUpdate: ${JSON.stringify(now)},
        homeTeam: ${JSON.stringify(homeTeam)},
        homeTeamWins: ${JSON.stringify(homeTeamWins)},
        homeTeamLosses: ${JSON.stringify(homeTeamLosses)},
        awayTeamWins: ${JSON.stringify(awayTeamWins)},
        awayTeamLosses: ${JSON.stringify(awayTeamLosses)},
        awayTeam: ${JSON.stringify(awayTeam)},
        startTime: ${JSON.stringify(startTime)},
        gameStatus: ${JSON.stringify(gameStatus)},
        sport: ${JSON.stringify(sport)},
        gameStarted: ${JSON.stringify(gameStarted)},
        gameEnded: ${JSON.stringify(gameEnded)},
        basicGameInfo: ${JSON.stringify(livePlays)},
    }) {
        createSportsGame(input: $input) {
            id
            lastUpdate
            homeTeam
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            awayTeam
            startTime
            gameStatus
            basicGameInfo
            sport
        }
    }`;

    let chatroomId = gamePk.toString().concat("-chatroom")
    const query_create_chatroom = `mutation createLiveGameChatRoomTable($input: CreateLiveGameChatRoomInput = {
        id: ${JSON.stringify(chatroomId)},
        sport: ${JSON.stringify('baseball')},
        sportsGameID: ${JSON.stringify(gamePk)}
    }) {
        createLiveGameChatRoom(input: $input) {
            id
            sport
            sportsGameID
        }
    }`;

    let value = Math.floor(Math.random() * 10000)

    let hubId = value.toString().concat("-hubpost")
    const query_create_hubpost = `mutation createHubPostsTable($input: CreateHubPostsInput = {
        id: ${JSON.stringify(hubId)},
        sortKey: ${JSON.stringify('hubpost')},
        postType: ${JSON.stringify('sport')},
        timePosted: ${JSON.stringify(now)},
        sportsGameID: ${JSON.stringify(gamePk)}
    }) {
        createHubPosts(input: $input) {
            id
            postType
            timePosted
            sportsGameID
        }
    }`;

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": `${query_create_item}` })
    };

    const options_chatroom = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": `${query_create_chatroom}` })
    };

    const options_hubpost = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": `${query_create_hubpost}` })
    };

    const request = await new Request(GRAPHQL_ENDPOINT, options);
    const request_add_chatroom = await new Request(GRAPHQL_ENDPOINT, options_chatroom)
    const request_add_hubpost = await new Request(GRAPHQL_ENDPOINT, options_hubpost)

    let statusCode = 200;
    let body;
    let body_chatroom;
    let body_hubpost;
    let response;
    let response_add_chatroom;
    let response_add_hubpost;

    try {
        response = await fetch(request);
        response_add_chatroom = await fetch(request_add_chatroom)
        response_add_hubpost = await fetch(request_add_hubpost)
        body = await response.json();
        body_chatroom = await response_add_chatroom.json();
        body_hubpost = await response_add_hubpost.json();
        return [body, body_chatroom, body_hubpost];
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: response.status,
                    message: error.message,
                    stack: error.stack
                }
            ]
        };
    }


    return {
        statusCode: 200,
        body: JSON.stringify('Oriole game successfully created!'),
    };
};



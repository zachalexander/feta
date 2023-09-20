
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
    const gamepk = data.gameData.game.pk;
    let livePlays = [];
    let inningData = [];
    let playData = {}

    let baseballData = data.liveData.plays.allPlays;
    let currentPlay = data.liveData.plays.currentPlay;
    let startingGameData = data.gameData;
    let halfInning;
    let innings = [];
    baseballData.forEach(playInfo => {
        let halfInningPrev = halfInning
        if (playInfo.about.inning > 3) {
            halfInning = `${playInfo.about.halfInning}`.charAt(0).toUpperCase().concat(`${playInfo.about.halfInning}`.slice(1), " ", `${playInfo.about.inning.toString()}`, "th")
        } else if (playInfo.about.inning == 3) {
            halfInning = `${playInfo.about.halfInning}`.charAt(0).toUpperCase().concat(`${playInfo.about.halfInning}`.slice(1), " ", `${playInfo.about.inning.toString()}`, "rd")
        } else if (playInfo.about.inning == 2) {
            halfInning = `${playInfo.about.halfInning}`.charAt(0).toUpperCase().concat(`${playInfo.about.halfInning}`.slice(1), " ", `${playInfo.about.inning.toString()}`, "nd")
        } else if (playInfo.about.inning == 1) {
            halfInning = `${playInfo.about.halfInning}`.charAt(0).toUpperCase().concat(`${playInfo.about.halfInning}`.slice(1), " ", `${playInfo.about.inning.toString()}`, "st")
        }

        playData["currentPlay"] = currentPlay;
        playData["startingGameData"] = startingGameData;

        if ((halfInning !== halfInningPrev)) {
            innings = [];
            innings.push(playInfo)
            playData[halfInning] = playInfo
        } else {
            innings.push(playInfo)
            playData[halfInning] = innings
        }
    })
    livePlays.push(playData);
    return JSON.stringify(livePlays)
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
    const startTime = data['gameDate']
    const gameStatus = data['status']['detailedState']
    const now = new Date().toISOString()

    const liveGame = await liveGameData(gamePk)
    const livePlays = await createLiveData(liveGame)

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
        liveGameData: ${JSON.stringify(livePlays)}
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
            liveGameData
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

    const request = await new Request(GRAPHQL_ENDPOINT, options);

    let statusCode = 200;
    let body;
    let response;

    try {
        response = await fetch(request);
        body = await response.json();
        return body;
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



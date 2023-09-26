import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = 'https://443foga42zglvpyr6erc7rh3l4.appsync-api.us-east-1.amazonaws.com/graphql';
const GRAPHQL_API_KEY = 'da2-d237viicnjbmphh333shl54iku';

async function formatDate(date) {
    const day = date.substring(3, 5)
    const month = date.substring(0, 2)
    const year = date.substring(6, 10)
    return `${year}-${month}-${day}`;
}

async function getMlbData(date) {
    let mlbdata = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}&teamId=110`).then(data => data.json());
    return mlbdata['dates'][0]['games'][0];
}

async function liveGameData(gamePk) {
    let liveData = await fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`).then(data => data.json())
    return liveData;
}

async function updateInitialData(data) {
    let playData = {};
    let updatedData = [];
    let gamepk = data.gameData.game.pk;
    let currentPlay = data.liveData.plays.currentPlay;
    let startingGameData = data.gameData;
    let finalData = data.liveData.decisions;

    playData["initialGameData"] = startingGameData
    playData["finalData"] = data.liveData.decisions
    playData["currentPlay"] = currentPlay;
    playData["latestPlays"] = data.liveData.plays.allPlays.slice(Math.max(data.liveData.plays.allPlays.length - 6, 0)).reverse()

    playData["latestPlays"].map((play, index) => {
        console.log(play.about.hasOut)

        if (play.about.hasOut && play.count.outs === 3) {

            if (play.about.inning > 3) {
                playData["latestPlays"][index - 1].result.test = "End of ".concat(play.about.halfInning, " ", play.about.inning, "th");
            }

            if (play.about.inning === 2) {
                playData["latestPlays"][index - 1].result.test = "End of ".concat(play.about.halfInning, " ", play.about.inning, "nd");
            }

            if (play.about.inning === 1) {
                playData["latestPlays"][index - 1].result.test = "End of ".concat(play.about.halfInning, " ", play.about.inning, "st");
            }
        }
    })

    updatedData.push(playData);
    return JSON.stringify(updatedData)
}

export const handler = async (event) => {

    const today = new Date().toLocaleString('en', { year: 'numeric', day: '2-digit', month: '2-digit', timeZone: 'America/New_York' });
    const formatted_date = await formatDate(today);
    const data = await getMlbData(formatted_date);

    const liveGame = await liveGameData(data['gamePk'])
    const livePlays = await updateInitialData(liveGame)

    const now = new Date().toISOString()
    const gamePk = data['gamePk']
    const homeTeam = data['teams']['home']['team']['name']
    const awayTeam = data['teams']['away']['team']['name']
    const awayTeamWins = data['teams']['away']['leagueRecord']['wins'].toString()
    const awayTeamLosses = data['teams']['away']['leagueRecord']['losses'].toString()
    const homeTeamWins = data['teams']['home']['leagueRecord']['wins'].toString()
    const homeTeamLosses = data['teams']['home']['leagueRecord']['losses'].toString()
    const startTime = data['gameDate']
    const gameStatus = data['status']['detailedState']
    const awayTeamLogoSlug = awayTeam.split(" ").join("-").toLowerCase();
    const homeTeamLogoSlug = homeTeam.split(" ").join("-").toLowerCase();
    const sport = 'baseball'

    let gameEnded;
    if (gameStatus == 'Final') {
        gameEnded = "true";
    } else {
        gameEnded = "false";
    }

    let gameStarted;
    if (startTime < now) {
        gameStarted = "true"
    } else {
        gameStarted = "false"
    }

    const query = `
        mutation updateSportsGameTable($input: UpdateSportsGameInput = {
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
        awayTeamLogoSlug: ${JSON.stringify(awayTeamLogoSlug)},
        homeTeamLogoSlug: ${JSON.stringify(homeTeamLogoSlug)},
        sport: ${JSON.stringify(sport)},
        gameStarted: ${JSON.stringify(gameStarted)},
        gameEnded: ${JSON.stringify(gameEnded)},
        initialGameInfo: ${JSON.stringify(livePlays)}
        }) {	
            	updateSportsGame(input:$input)  {
                __typename
                id
                lastUpdate
                homeTeam
                awayTeam
                startTime
                gameStatus
                homeTeamWins
                homeTeamLosses
                awayTeamWins
                awayTeamLosses
                awayTeamLogoSlug
                homeTeamLogoSlug
                initialGameInfo
                gameStarted
                gameEnded
                liveGameData
            } 
        }
    `;

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "query": `${query}` })
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
        body: JSON.stringify('Hello from Lambda!'),
    };
};

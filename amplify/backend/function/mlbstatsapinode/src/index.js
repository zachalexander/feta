import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = 'https://443foga42zglvpyr6erc7rh3l4.appsync-api.us-east-1.amazonaws.com/graphql';
const GRAPHQL_API_KEY = 'da2-d237viicnjbmphh333shl54iku';

async function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

async function getMlbData(date) {
    let mlbdata = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}&teamId=110`).then(data => data.json());
    return mlbdata['dates'][0]['games'][0];
}

async function liveGameData() {
    let liveData = await fetch('https://statsapi.mlb.com/api/v1.1/game/716597/feed/live').then(data => data.json())
    return liveData;
}

async function createLiveData(data) {
    const gamepk = data.gameData.game.pk;
    const livePlays = [];
    for (let i = 0; i < data.liveData.plays.allPlays.length; i++) {
        const play = {}
        play.gamepk = gamepk;
        play.away_score = data.liveData.linescore.teams.away.runs;
        play.home_score = data.liveData.linescore.teams.home.runs;
        const ab = data.liveData.plays.allPlays[i];
        play.date = data.gameData.datetime.officialDate;
        play.temp = data.gameData.weather.temp;
        play.condition = data.gameData.weather.condition;
        play.wind = data.gameData.weather.wind;
        play.venue = data.gameData.venue.id;
        play.batter = ab.matchup.batter.id;
        play.batter_name = ab.matchup.batter.fullName;
        play.stand = ab.matchup.batSide.code;
        play.pitcher = ab.matchup.pitcher.id;
        play.pitcher_name = ab.matchup.pitcher.fullName;
        play.throws = ab.matchup.pitchHand.code;
        play.events = ab.result.event;
        play.description = ab.result.eventType;
        play.des = ab.result.description;
        play.strikes = ab.count.strikes;
        play.balls = ab.count.balls;
        play.outs = ab.count.outs;
        play.home_team = data.gameData.teams.home.abbreviation;
        play.away_team = data.gameData.teams.away.abbreviation;
        play.year = data.gameData.game.season;
        play.type = data.gameData.game.gamedayType;
        play.game_type = data.gameData.game.type;
        play.inning = ab.about.inning;
        play.topbot = ab.about.halfInning;
        play.abnum = ab.atBatIndex;
        const pitchnum = (typeof ab.playEvents !== "undefined") ? ab.playEvents.length : 1;
        play.pitchnum = pitchnum;
        play.id = String(gamepk) + "-" + String(ab.matchup.batter.id) + "-" + String(ab.matchup.pitcher.id) + "-" + String(ab.about.inning) + "-" + String(ab.atBatIndex) + "-" + String(pitchnum);
        livePlays.push(play)
    }
    return JSON.stringify(livePlays);
}

export const handler = async (event) => {

    const today = new Date();
    const formatted_date = await formatDate(today);
    const data = await getMlbData(formatted_date);

    const liveGame = await liveGameData()
    const livePlays = await createLiveData(liveGame)

    console.log(livePlays)

    const gamePk = data['gamePk']
    const homeTeam = data['teams']['home']['team']['name']
    const awayTeam = data['teams']['away']['team']['name']
    const startTime = data['gameDate']
    const gameStatus = data['status']['detailedState']
    const now = new Date().toISOString()

    const query = `
        mutation updateSportsGameTable($input: UpdateSportsGameInput = {
        id: ${JSON.stringify(gamePk)}, 
        lastUpdate: ${JSON.stringify(now)},
        homeTeam: ${JSON.stringify(homeTeam)},
        awayTeam: ${JSON.stringify(awayTeam)},
        startTime: ${JSON.stringify(startTime)},
        gameStatus: ${JSON.stringify(gameStatus)},
        liveGameData: ${JSON.stringify(livePlays)}
        }) {	
            	updateSportsGame(input:$input)  {
                __typename
                id
                lastUpdate
                homeTeam
                awayTeam
                startTime
                gameStatus
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
        body: JSON.stringify({ query })
    };


    const request = await new Request(GRAPHQL_ENDPOINT, options);

    let statusCode = 200;
    let body;
    let response;

    try {
        response = await fetch(request);
        body = await response.json();
        if (body.errors) statusCode = 400;
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

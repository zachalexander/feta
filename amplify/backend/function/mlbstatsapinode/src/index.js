import { default as fetch, Request } from 'node-fetch';
const MLBStatsAPI = require('mlb-stats-api');
const mlbStats = new MLBStatsAPI();

const GRAPHQL_ENDPOINT = 'https://443foga42zglvpyr6erc7rh3l4.appsync-api.us-east-1.amazonaws.com/graphql';
const GRAPHQL_API_KEY = 'da2-d237viicnjbmphh333shl54iku';

const game = `"716621"`
const team = `"Orioles Magic Fan Base Fan Yolo"`


const query = /* GraphQL */ `
  mutation updateSportsGameTable($input: UpdateSportsGameInput = {id: ${game}, homeTeam: ${team}}) {	
	updateSportsGame(input:$input)  {
    __typename
    id
  } 
  
}
`;

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

export const handler = async (event) => {

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    };


    const today_date = new Date()

    const mlb_request = mlbStats.getSchedule({ params: { sportId: 1 } })

    console.log(mlb_request)


    const request = new Request(GRAPHQL_ENDPOINT, options);

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
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};

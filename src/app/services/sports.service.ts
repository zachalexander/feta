import { Injectable } from '@angular/core';
import { Storage } from '@aws-amplify/storage';
import { APIService } from "../API.service";
import API, { graphqlOperation } from "@aws-amplify/api-graphql";
import { DomSanitizer } from '@angular/platform-browser';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(
    private api: APIService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  getSportsData(): Observable<any> {
    return from(this.getData()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // getCurrentPlayerGameData(): Observable<any> {
  //   return from(this.getPlayerData()).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   )
  // }

  async getData(): Promise<any> {

    const statement = `query ListSportsGames($filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
        listSportsGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sorterValue
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            startTime
            lastUpdate
            awayTeamLogoSlug
            homeTeamLogoSlug
            gameStarted
            gameEnded
            liveGameID
            livegame {
              __typename
              id
              sport
              createdAt
              updatedAt
            }
            liveGameData
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments), { authMode: 'API_KEY', 'x-api-key': 'da2-d237viicnjbmphh333shl54iku' }
    )) as any;
    return response.data.listSportsGames.items;
  }


  async getPitcherFinalData(personId, gamePk): Promise<any>{
    if(personId && gamePk) {
      let response = await fetch(`https://statsapi.mlb.com/api/v1/people/${personId}/stats/game/${gamePk}`).then(data => data.json());
      if(response.stats[0].splits[1].stat){
        return response.stats[0].splits[1].stat as any;
      }
    }
  }

  async getBatterData(personId, gamePk): Promise<any> {
    if (personId && gamePk) {
      let response = await fetch(`https://statsapi.mlb.com/api/v1/people/${personId}/stats/game/${gamePk}`).then(data => data.json());
      return response.stats[0].splits[2].stat.summary as any;
    }
  }

  async getPitcherData(personId, gamePk): Promise<any> {
    if (personId && gamePk) {
      let response = await fetch(`https://statsapi.mlb.com/api/v1/people/${personId}/stats/game/${gamePk}`).then(data => data.json());
      return response.stats[0].splits[1].stat.summary as any;
    }
  }

  async getPitcherSeasonData(personId): Promise<any> {
    if (personId) {
      let response = await fetch(`https://statsapi.mlb.com/api/v1/people/${personId}/stats?stats=season&group=pitching`).then(data => data.json());
      return response.stats[0].splits as any;
    }
  }

  async updateOriolesData(){
    let response = await fetch(`https://l73a4t7hnq2fwro4pyqiz54c2e0nlqgr.lambda-url.us-east-1.on.aws/`).then(data => data.json())
    return response.data.updateSportsGame as any;
  }
}

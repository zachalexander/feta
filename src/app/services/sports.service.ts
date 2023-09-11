import { Injectable } from '@angular/core';
import { Storage } from '@aws-amplify/storage';
import { APIService } from "../API.service";
import API, { graphqlOperation } from "@aws-amplify/api-graphql";
import { DomSanitizer } from '@angular/platform-browser';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(
    private api: APIService,
    private sanitizer: DomSanitizer,
  ) { }

  getSportsData(): Observable<any> {
    return from(this.getData()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  async getData(): Promise<any> {

    const statement = `query ListSportsGames($filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
      listSportsGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
        __typename
          items {
          __typename
          id
          startTime
          homeTeam
          homeTeamLogo
          awayTeam
          awayTeamLogo
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          gameStatus
          lastUpdate
            BaseballGame {
            __typename
            sportsGameID
            awayHitterOne
            awayHitterTwo
            awayHitterThree
            awayHitterFour
            awayHitterFive
            awayHitterSix
            awayHitterSeven
            awayHitterEight
            awayHitterNine
            homeHitterOne
            homeHitterTwo
            homeHitterThree
            homeHitterFour
            homeHitterFive
            homeHitterSix
            homeHitterSeven
            homeHitterEight
            homeHitterNine
            boxInfo
            lastUpdate
            id
          }
          sportsGameBaseballGameId
        }
        nextToken
      }
    }`;

    const response = (await API.graphql(
      graphqlOperation(statement)
    )) as any;
    return response.data.listSportsGames.items;
  }
}

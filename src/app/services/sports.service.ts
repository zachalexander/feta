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

  async getData(): Promise<any> {

    const statement = `query ListSportsGames($filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
      listSportsGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
        __typename
          items {
          __typename
          id
          startTime
          homeTeam
          awayTeam
          gameStatus
          lastUpdate
          liveGameData
        }
        nextToken
      }
    }`;

    const response = (await API.graphql(
      graphqlOperation(statement), { authMode: 'API_KEY', 'x-api-key': 'da2-d237viicnjbmphh333shl54iku'}
    )) as any;
    return response.data.listSportsGames.items;
  }
}

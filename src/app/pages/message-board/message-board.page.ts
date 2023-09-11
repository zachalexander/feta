import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { Subscription, finalize } from 'rxjs';
import { ZenObservable } from 'zen-observable-ts';

import { GraphQLSubscription } from '@aws-amplify/api';
import { OnUpdateSportsGameSubscription } from 'src/app/API.service';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from 'src/graphql/subscriptions';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  data: any;
  baseballData: any = [];
  private subscription: ZenObservable.Subscription | null = null

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    window.location.reload();
  }

  async ngOnInit() {

    // const sub = API.graphql<GraphQLSubscription<OnUpdateSportsGameSubscription>>(
    //   graphqlOperation(subscriptions.onUpdateSportsGame)
    // ).subscribe({
    //   next: ({ provider, value }) => console.log({ provider, value }),
    //   error: error => console.warn(error)
    // });

  


    this.startSubscriptions();
    this.getSportsData();

    // this.onUpdateSportsGame = <Subscription>(
    //   this.api.OnUpdateSportsGameListener().subscribe(
    //     (event: any) => {
    //       const data = event;
    //       console.log(data)
    //     }
    //   )
    // )
  

    // this.subscription = this.api.OnUpdateSportsGameListener().subscribe(
    //   (event: any) => {
    //     console.log(event)
    //   }
    // )
  }

  startSubscriptions() {
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data)
        }
      })
    )
  }

  async ngOnDestroy() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
  }


  async getSportsData(){
    await this.sportsService.getSportsData().pipe(
      finalize(() => {
        // this.loaded = true;
      })
    ).subscribe(data => {
      this.baseballData = data;
      console.log(this.baseballData)
    })
  }


}

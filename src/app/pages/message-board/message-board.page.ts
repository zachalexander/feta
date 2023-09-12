import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  data: any;
  baseballData: any = [];

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    this.api.UpdateSportsGame({id: '716621', gameStatus: 'started'})
    // window.location.reload();
  }


  async ngOnInit() {

    // const sub = API.graphql<GraphQLSubscription<OnUpdateSportsGameSubscription>>(
    //   graphqlOperation(subscriptions.onUpdateSportsGame)
    // ).subscribe({
    //   next: ({ provider, value }) => console.log({ provider, value }),
    //   error: error => console.warn(error)
    // });

  
    const behaviorSubject = new BehaviorSubject('event -1');
    behaviorSubject.next('event 0')

    this.startSubscriptions();
    this.getSportsData();
    this.getBaseballData();

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

  async getBaseballData(){
    await this.sportsService.getMlbData().subscribe(data => {
      console.log(data['liveData']['plays']['currentPlay']['result'])
    })
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

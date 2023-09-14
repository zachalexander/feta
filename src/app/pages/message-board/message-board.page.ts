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
  liveData: any = [];
  lastEvent: any = [];
  lastEventDescription;

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    this.api.UpdateSportsGame({id: '716621', gameStatus: 'started'})
    // window.location.reload();
  }


  async ngOnInit() {
    this.startSubscriptions();
    this.getSportsData();
  }

  startSubscriptions() {
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data.value.data.onUpdateSportsGame)
          this.baseballData = [data.value.data.onUpdateSportsGame];
          this.liveData = JSON.parse(this.baseballData[0].liveGameData)
          console.log(this.liveData)

          this.lastEvent = this.liveData[this.liveData.length - 1]
          this.lastEventDescription = this.liveData[this.liveData.length - 1].des ? this.liveData[this.liveData.length - 1].des : this.lastEventDescription;
          console.log(this.lastEvent)
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
      this.liveData = JSON.parse(this.baseballData[0].liveGameData)
      this.lastEvent = this.liveData[this.liveData.length - 1]
      this.lastEventDescription = this.lastEventDescription;
    })
  }


}

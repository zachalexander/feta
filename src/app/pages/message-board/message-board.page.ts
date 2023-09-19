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
  currentData: any = [];
  lastEvent: any = [];
  lastEventDescription;

  halfInnings = ["Top 1st", "Bottom 1st", "Top 2nd", "Bottom 2nd", "Top 3rd", "Bottom 3rd", "Top 4th", "Bottom 4th", "Top 5th", "Bottom 5th", "Top 6th", "Bottom 6th", "Top 7th", "Bottom 7th", "Top 8th", "Bottom 8th", "Top 9th", "Bottom 9th"]

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    window.location.reload();
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
          this.currentData = JSON.parse(this.baseballData[0].liveGameData)
          console.log(this.currentData)

          // this.lastEvent = this.liveData[0]
          // this.lastEventDescription = this.liveData[0].des ? this.liveData[0].des : this.lastEventDescription;
          // console.log(this.lastEvent)
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
      console.log(JSON.parse(this.baseballData[0].liveGameData))
      this.liveData = JSON.parse(this.baseballData[0].liveGameData).reverse().length !== 0 ? JSON.parse(this.baseballData[0].liveGameData).reverse() : JSON.parse(this.baseballData[1].liveGameData).reverse() 
      console.log(this.liveData[0])

      this.currentData = this.liveData[0]
      // this.lastEvent = this.liveData[0]
      // this.lastEventDescription = this.lastEventDescription;
    })
  }


}

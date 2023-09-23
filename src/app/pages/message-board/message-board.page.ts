import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
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
  opponentName;
  currentHalfInning;

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
    console.log(this.baseballData)
  }

  startSubscriptions() {
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;

          this.baseballData.map((game, index) => {
            if(data.value.data.onUpdateSportsGame.id === game.id){
              this.baseballData[index] = data.value.data.onUpdateSportsGame;
              this.baseballData[index].initialGameInfo = JSON.parse(this.baseballData[index].initialGameInfo)
              this.baseballData[index].currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
            }
          })

          console.log(this.baseballData)
          // this.baseballData = [data.value.data.onUpdateSportsGame];
          // console.log(this.baseballData)
          // this.currentData = JSON.parse(this.baseballData[0].liveGameData)
          // console.log(this.currentData)

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
    await this.api.SportsGamesBySportAndStartTime("baseball", null, ModelSortDirection.DESC).then(data => {
      this.baseballData = data.items;
      console.log(this.baseballData)
      this.baseballData.map(async game => {
        game.initialGameInfo = await JSON.parse(game.initialGameInfo)
        game.liveGameData = await JSON.parse(game.liveGameData)
        game.currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
        game.lastEvent = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.playEvents[game.initialGameInfo[0].currentPlay.playEvents.length - 1].details.description : null;
      })
    })
  }
  
  
  



}

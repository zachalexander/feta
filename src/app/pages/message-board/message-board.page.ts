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

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    window.location.reload();
  }


  async ngOnInit() {
    this.startSubscriptions();
    await this.getSportsData();
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
        game.oriolesOutcome = (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore > game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore > game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : "O's LOST"
        game.losingPitcherStats = (game.gameStatus === 'Final' && game.initialGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.loser.id, +game.id) as any: null;
        game.winningPitcherStats = (game.gameStatus === 'Final' && game.initialGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.winner.id, +game.id) as any: null;
        game.currentBatterStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.initialGameInfo[0].currentPlay.matchup.batter.id, +game.id) as any : null;
        game.currentPitcherStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.initialGameInfo[0].currentPlay.matchup.pitcher.id, +game.id) as any : null;
      })
    })
  }

  async getFinalPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherFinalData(playerId, gamePk).then(data => data);
  }

  async getCurrentBatterGameStats(playerId, gamePk) {
    return await this.sportsService.getBatterData(playerId, gamePk).then(data => data);
  }
  
  async getCurrentPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherData(playerId, gamePk).then(data => data);
  }



}

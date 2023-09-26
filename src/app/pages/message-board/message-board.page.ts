import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { Amplify } from 'aws-amplify';
import awsconfig from './../../../aws-exports';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

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
  mobilePlatform;

  constructor(
    private api: APIService,
    private sportsService: SportsService,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router
  ) {
    this.mobilePlatform = this.platform.is("mobile");
  }

  refresh(){
    // window.location.reload();
    this.sportsService.updateOriolesData()
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

          this.baseballData.map(async (game, index) => {
            if(data.value.data.onUpdateSportsGame.id === game.id){
              this.baseballData[index] = data.value.data.onUpdateSportsGame;
              this.baseballData[index].initialGameInfo = JSON.parse(this.baseballData[index].initialGameInfo)
              this.baseballData[index].currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;

              if (game.gameStatus === 'Final') {
                this.baseballData[index].oriolesOutcome = (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore > game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore > game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore < game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore < game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
                this.baseballData[index].losingPitcherStats = (game.initialGameInfo[0].finalData && game.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.loser.id, +game.id) as any : null;
                this.baseballData[index].winningPitcherStats = (game.gameStatus === 'Final' && game.initialGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.winner.id, +game.id) as any : null;
              }

              if (game.gameStatus === 'Scheduled' || game.gameStatus === 'Pre-Game' || game.gameStatus === 'Warmup') {
                this.baseballData[index].startingAwayPitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
                this.baseballData[index].startingHomePitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
              }

              if (game.gameStatus === 'In Progress') {
                this.baseballData[index].currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
                this.baseballData[index].currentBatterStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.initialGameInfo[0].currentPlay.matchup.batter.id, +game.id) as any : null;
                this.baseballData[index].currentPitcherStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.initialGameInfo[0].currentPlay.matchup.pitcher.id, +game.id) as any : null;
              }
            }
          })
          console.log(this.baseballData)
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
      this.baseballData.map(async game => {
        game.initialGameInfo = await JSON.parse(game.initialGameInfo)
        if(game.gameStatus === 'Final') {
          game.oriolesOutcome = (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore > game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore > game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore < game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore < game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
          game.losingPitcherStats = (game.initialGameInfo[0].finalData && game.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.loser.id, +game.id) as any: null;
          game.winningPitcherStats = (game.gameStatus === 'Final' && game.initialGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.winner.id, +game.id) as any: null;
        }

        if(game.gameStatus === 'Scheduled' || game.gameStatus === 'Pre-Game' || game.gameStatus === 'Warmup'){
          game.startingAwayPitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
          game.startingHomePitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
        }

        if(game.gameStatus === 'In Progress'){
          game.currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;        
          game.currentBatterStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.initialGameInfo[0].currentPlay.matchup.batter.id, +game.id) as any : null;
          game.currentPitcherStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.initialGameInfo[0].currentPlay.matchup.pitcher.id, +game.id) as any : null;
        }
      })
    })
  }

  async getFinalPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherFinalData(playerId, gamePk).then(data => data);
  }

  async getStartingPitcherStats(playerId) {
    return await this.sportsService.getPitcherSeasonData(playerId).then(data => data);
  }

  async getCurrentBatterGameStats(playerId, gamePk) {
    return await this.sportsService.getBatterData(playerId, gamePk).then(data => data);
  }
  
  async getCurrentPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherData(playerId, gamePk).then(data => data);
  }

  async refreshEvent(event){

      if(this.mobilePlatform){
        await Haptics.impact({style: ImpactStyle.Heavy})
      }

      const alert = await this.alertController.create({
        header: 'Game Update Failed',
        message: 'Please try again in a moment.',
        buttons: ['OK']
      })

      await this.sportsService.updateOriolesData().then(async (data) => {
        this.baseballData.map(async (game) => {
          if(data.id === game.id){
            if (game.gameStatus === 'Final') {
              game.oriolesOutcome = (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore > game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore > game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (game.gameStatus === 'Final' && (game.awayTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.awayScore < game.initialGameInfo[0].currentPlay.result.homeScore) || (game.homeTeam === 'Baltimore Orioles' && game.initialGameInfo[0].currentPlay.result.homeScore < game.initialGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
              game.losingPitcherStats = (game.initialGameInfo[0].finalData && game.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.loser.id, +game.id) as any : null;
              game.winningPitcherStats = (game.gameStatus === 'Final' && game.initialGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.initialGameInfo[0].finalData.winner.id, +game.id) as any : null;
            }

            if (game.gameStatus === 'Scheduled' || game.gameStatus === 'Pre-Game' || game.gameStatus === 'Warmup') {
              game.startingAwayPitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
              game.startingHomePitcherStats = ((game.gameStatus !== 'In Progress' && game.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.initialGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
            }

            if (game.gameStatus === 'In Progress') {
              game.currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
              game.currentBatterStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.initialGameInfo[0].currentPlay.matchup.batter.id, +game.id) as any : null;
              game.currentPitcherStats = (game.gameStatus !== 'Final' && game.initialGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.initialGameInfo[0].currentPlay.matchup.pitcher.id, +game.id) as any : null;
            }
          }
        })
        const currentRoute = this.router.url;

        this.router.navigateByUrl('/message-board', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]); // navigate to same route
        }); 
      }).catch(async error => {
        console.log(error, 'failed to update')
        await alert.present();
      }).finally(() => {
        event.target.complete();
      });
  }



}

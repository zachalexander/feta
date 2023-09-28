import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import awsconfig from './../../../aws-exports';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseballChatroomPage } from 'src/app/modals/baseball-chatroom/baseball-chatroom.page';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  data: any;
  baseballData: any = [];
  hubData: any = [];
  liveData: any = [];
  currentData: any = [];
  lastEvent: any = [];
  lastEventDescription;
  opponentName;
  currentHalfInning;
  mobilePlatform;

  testData: any = [];

  priorConnectionState: ConnectionState;

  constructor(
    private api: APIService,
    private sportsService: SportsService,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) {
    this.mobilePlatform = this.platform.is("mobile");
  }

  async ngOnInit() {
    this.startSubscriptions();
    await this.getHubData();

    Hub.listen('api', (data: any) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState as ConnectionState;
        console.log(connectionState)
      }
    })
  }

  async openBaseballChatroom(gameData, gameID){
    const modal = await this.modalController.create({
      component: BaseballChatroomPage,
      componentProps: {
        baseballData: gameData,
        sportsGameID: gameID
      }
    });

    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     this.dataReturned = dataReturned.data;
    //   }
    // });
    return await modal.present();
  }

  startSubscriptions() {
    this.onUpdateHubPost = <Subscription>(
      this.api.OnUpdateHubPostsListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data)
        }
      })
    )
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          this.hubData.map(async (game) => {
            if(data.value.data.onUpdateSportsGame.id === game.sportsgame.id){
              console.log(data.value.data.onUpdateSportsGame)
              game.sportsgame.losingPitcherStats = [];
              game.sportsgame.winningPitcherStats = [];
              game.sportsgame.oriolesOutcome = [];
              game.sportsgame.currentHalfInning = null;
              game.sportsgame.currentBatterStats = [];
              game.sportsgame.currentPitcherStats = [];
              game.sportsgame = data.value.data.onUpdateSportsGame;
              game.sportsgame.basicGameInfo = JSON.parse(data.value.data.onUpdateSportsGame.basicGameInfo)
              game.sportsgame.currentHalfInning = game.sportsgame.gameStatus === 'In Progress' ? game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.sportsgame.basicGameInfo[0].currentPlay.about.inning.toString()) : null;

              if (game.sportsgame.gameStatus === 'Final') {
                game.sportsgame.oriolesOutcome = (game.sportsgame.gameStatus === 'Final' && (game.sportsgame.awayTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore > game.basicGameInfo[0].currentPlay.result.homeScore) || (game.sportsgame.homeTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore > game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (game.sportsgame.gameStatus === 'Final' && (game.sportsgame.awayTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore < game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (game.sportsgame.homeTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore < game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
                game.sportsgame.losingPitcherStats = (game.sportsgame.basicGameInfo[0].finalData && game.sportsgame.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(game.sportsgame.basicGameInfo[0].finalData.loser.id, +game.sportsgame.id) as any : null;
                game.sportsgame.winningPitcherStats = (game.sportsgame.gameStatus === 'Final' && game.sportsgame.basicGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.sportsgame.basicGameInfo[0].finalData.winner.id, +game.sportsgame.id) as any : null;
              }

              if (game.sportsgame.gameStatus === 'Scheduled' || game.sportsgame.gameStatus === 'Pre-Game' || game.sportsgame.gameStatus === 'Warmup') {
                game.sportsgame.startingAwayPitcherStats = ((game.sportsgame.gameStatus !== 'In Progress' && game.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
                game.sportsgame.startingHomePitcherStats = ((game.sportsgame.gameStatus !== 'In Progress' && game.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
              }

              if (game.sportsgame.gameStatus === 'In Progress') {
                game.sportsgame.currentHalfInning = game.sportsgame.gameStatus === 'In Progress' ? game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.sportsgame.basicGameInfo[0].currentPlay.about.inning.toString()) : null;
                game.sportsgame.currentBatterStats = (game.sportsgame.gameStatus !== 'Final' && game.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.sportsgame.basicGameInfo[0].currentPlay.matchup.batter.id, +game.sportsgame.id) as any : null;
                game.sportsgame.currentPitcherStats = (game.sportsgame.gameStatus !== 'Final' && game.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.sportsgame.basicGameInfo[0].currentPlay.matchup.pitcher.id, +game.sportsgame.id) as any : null;
              }
            }
          })
        }
      })
    )
  }

  async ngOnDestroy() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
    if (this.onUpdateHubPost) {
      await this.onUpdateHubPost.unsubscribe();
    }
  }


  async getHubData(){
    await this.api.HubPostsBySortKeyAndTimePosted("hubpost", null, ModelSortDirection.DESC).then(data => {
      this.hubData = data.items;
      this.hubData.map(async hubs => {
        if(hubs.postType === 'sport' && hubs.sportsgame.sport === 'baseball'){
          hubs.sportsgame.basicGameInfo = await JSON.parse(hubs.sportsgame.basicGameInfo)
          hubs.sportsgame.losingPitcherStats = [];
          hubs.sportsgame.winningPitcherStats = [];
          hubs.sportsgame.oriolesOutcome = [];
          hubs.sportsgame.currentHalfInning = null;
          hubs.sportsgame.currentBatterStats = [];
          hubs.sportsgame.currentPitcherStats = [];

          if (hubs.sportsgame.gameStatus === 'Final') {
            hubs.sportsgame.oriolesOutcome = (hubs.sportsgame.gameStatus === 'Final' && (hubs.sportsgame.awayTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore > hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (hubs.sportsgame.homeTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore > hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (hubs.sportsgame.gameStatus === 'Final' && (hubs.sportsgame.awayTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore < hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (hubs.sportsgame.homeTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore < hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
            hubs.sportsgame.losingPitcherStats = (hubs.sportsgame.basicGameInfo[0].finalData && hubs.sportsgame.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(hubs.sportsgame.basicGameInfo[0].finalData.loser.id, +hubs.sportsgame.id) : [];
            hubs.sportsgame.winningPitcherStats = (hubs.sportsgame.gameStatus === 'Final' && hubs.sportsgame.basicGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(hubs.sportsgame.basicGameInfo[0].finalData.winner.id, +hubs.sportsgame.id) : [];
          }

          if (hubs.sportsgame.gameStatus === 'Scheduled' || hubs.sportsgame.gameStatus === 'Pre-Game' || hubs.sportsgame.gameStatus === 'Warmup') {
            hubs.sportsgame.startingAwayPitcherStats = ((hubs.sportsgame.gameStatus !== 'In Progress' && hubs.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(hubs.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.away.id) as any : [];
            hubs.sportsgame.startingHomePitcherStats = ((hubs.sportsgame.gameStatus !== 'In Progress' && hubs.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(hubs.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.home.id) as any : [];
          }

          if (hubs.sportsgame.gameStatus === 'In Progress') {
            hubs.sportsgame.currentHalfInning = hubs.sportsgame.gameStatus === 'In Progress' ? hubs.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(hubs.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", hubs.sportsgame.basicGameInfo[0].currentPlay.about.inning.toString()) : null;
            hubs.sportsgame.currentBatterStats = (hubs.sportsgame.gameStatus !== 'Final' && hubs.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(hubs.sportsgame.basicGameInfo[0].currentPlay.matchup.batter.id, +hubs.sportsgame.id) as any : [];
            hubs.sportsgame.currentPitcherStats = (hubs.sportsgame.gameStatus !== 'Final' && hubs.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(hubs.sportsgame.basicGameInfo[0].currentPlay.matchup.pitcher.id, +hubs.sportsgame.id) as any : [];
          }
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

      await this.sportsService.updateOriolesData().then(async (data) => data).catch(async error => {
        await alert.present();
      }).finally(() => {
        event.target.complete();
      });


  }

}

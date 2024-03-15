import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Observable, Subject, Subscription, finalize } from 'rxjs';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import awsconfig from './../../../aws-exports';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ModalController, Platform, AlertController, ViewDidLeave, ViewDidEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseballChatroomPage } from 'src/app/modals/baseball-chatroom/baseball-chatroom.page';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements ViewDidEnter, ViewDidLeave {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  onUpdateAtBatIndex: Subscription | null = null;
  data: any;
  hubData: any = [];
  liveData: any = [];
  currentData: any = [];
  lastEvent: any = [];
  gamePlays: any = [];
  lastEventDescription;
  opponentName;
  currentHalfInning;
  mobilePlatform;
  pitcherInfo;
  weatherInfo;

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

  async ionViewDidEnter() {
    console.log(this.router.url)
    this.startSubscriptions();
    await this.getHubData();
  }


  async openBaseballChatroom(gameData, gameID){
    const modal = await this.modalController.create({
      component: BaseballChatroomPage,
      componentProps: {
        baseballData: gameData,
        sportsGameID: gameID
      }
    });
    return await modal.present();
  }

  startSubscriptions() {
    this.onUpdateHubPost = <Subscription>(
      this.api.OnUpdateHubPostsListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data)
        },
        error: async (err: any) => {
          console.log(err)
        },
        complete: () => console.log('hub subscription complete')
      })
    )
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          this.hubData.map(async (game) => {
            if(data.value.data.onUpdateSportsGame.id === game.sportsgame.id){
              game.sportsgame.gameInfo.currentHalfInning = null;
              game.sportsgame.gameInfo = JSON.parse(data.value.data.onUpdateSportsGame.gameInfo)
              game.sportsgame.gameInfo.currentHalfInning = game.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress' ? game.sportsgame.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.sportsgame.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", game.sportsgame.gameInfo.currentPlay.about.inning.toString()) : null;
              game.sportsgame.lastUpdate = data.value.data.onUpdateSportsGame.lastUpdate

              if (Date.parse(game.sportsgame.startTime) > Date.now()) {
                game.sportsgame.gameInfo.gameStarted = false;
              } else {
                game.sportsgame.gameInfo.gameStarted = true;
              }

              if (game.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress') {
                game.sportsgame.gameInfo.currentHalfInning = game.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress' ? game.sportsgame.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.sportsgame.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", game.sportsgame.gameInfo.currentPlay.about.inning.toString()) : null;              
              }
                console.log(game)
            }
          })
        },
        error: async (err: any) => {
          console.log(err)
        },
        complete: () => console.log('game subscription complete')
      })
    )

    this.onUpdateAtBatIndex = <Subscription>(
      this.api.OnUpdateBaseballAtBatIndexListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data)
        }
      })
    )

  }

  async ionViewDidLeave() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
    if (this.onUpdateHubPost) {
      await this.onUpdateHubPost.unsubscribe();
    }
    if (this.onUpdateAtBatIndex) {
      await this.onUpdateAtBatIndex.unsubscribe();
    }
  }


  async getHubData(){
    await this.api.HubPostsBySortKeyAndTimePosted("hubpost", null, ModelSortDirection.DESC).then(data => {
      this.hubData = data.items;
      this.hubData.map(async hubs => {
        if(hubs.postType === 'sport' && hubs.sportsgame.sport === 'baseball'){
          hubs.sportsgame.gameInfo = await JSON.parse(hubs.sportsgame.gameInfo)
          this.pitcherInfo = Object.keys(hubs.sportsgame.gameInfo.initialGameData.probablePitchers).length;
          this.weatherInfo = Object.keys(hubs.sportsgame.gameInfo.initialGameData.weather).length

          if(Date.parse(hubs.sportsgame.startTime) > Date.now()){
            hubs.sportsgame.gameInfo.gameStarted = false;
          } else {
            hubs.sportsgame.gameInfo.gameStarted = true;
          }

          hubs.sportsgame.gameInfo.currentHalfInning = null;
          hubs.sportsgame.gameInfo.currentHalfInning = hubs.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress' ? hubs.sportsgame.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(hubs.sportsgame.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", hubs.sportsgame.gameInfo.currentPlay.about.inning.toString()) : null;

          if (hubs.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress') {
            hubs.sportsgame.gameInfo.currentHalfInning = hubs.sportsgame.gameInfo.initialGameData.status.detailedState === 'In Progress' ? hubs.sportsgame.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(hubs.sportsgame.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", hubs.sportsgame.gameInfo.currentPlay.about.inning.toString()) : null;
          }
        }
      })
    })
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { BehaviorSubject, Subscription, finalize, timer, Subject, Observable, switchMap, takeUntil } from 'rxjs';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';
import { DateSuffixPipe } from 'src/app/pipes/date-suffix.pipe';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';

import { trigger, state, style, animate, transition, query, stagger} from '@angular/animations';


@Component({
  selector: 'app-baseball-chatroom',
  templateUrl: './baseball-chatroom.page.html',
  styleUrls: ['./baseball-chatroom.page.scss'],
  animations: [
    trigger('playRender', [
      transition('* => *', [
        query(':leave', [
          stagger(500, [
            animate(1000, style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          animate(1000, style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ],
})
export class BaseballChatroomPage implements ViewDidEnter, ViewDidLeave {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  onUpdateChats: Subscription | null = null;
  onCreateBaseballAtBatIndex: Subscription | null = null;
  postChat = {} as FormGroup;
  @ViewChild(IonContent) ionContent: IonContent;
  priorConnectionState: ConnectionState;
  
  baseballData: any;
  gamePlays: any = [];
  sportsGameID;
  liveGameChatRoomID;
  accordionOpen;
  profilePicture;
  hasProfilePic: boolean;

  userProfileID;
  userUsernameID;
  userTyped;

  chats;
  livechatroomdata;

  closeTimer$ = new Subject<any>();

  newPlays;
  newPlaysAnimate;

  constructor(
    private modalController: ModalController,
    private api: APIService,
    private sportsService: SportsService
  ) { 
    this.postChat = new FormGroup({
      chat: new FormControl('')
    })
  }

  async getPlays(gamePk){
    this.gamePlays = await this.api.BaseballAtBatIndicesBySportsGameIDAndBatIndex(gamePk, null, ModelSortDirection.ASC).then(data => data.items)
    this.gamePlays.map(async plays => {
      plays.count = await JSON.parse(plays.count);
      plays.id = await JSON.parse(plays.id)
      plays.pitchData = await JSON.parse(plays.pitchData)
    })
    const sorted = this.gamePlays.sort((a, b) => {
      return a.batIndex - b.batIndex || a.pitchCount - b.pitchCount;
    })
    return sorted;
  }

  async getChats(livegamechatroomid){
    let response = await this.api.ChatsByLiveGameChatRoomIDAndTimePosted(livegamechatroomid, null, ModelSortDirection.ASC).then(data => data);
    return response.items;
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.ionContent.scrollToBottom(400);
    }, 50)
  }

  async ionViewDidEnter() {
    this.startSubscriptions();
    console.log(this.baseballData)
    // this.accordionOpen = false;
    this.userTyped = false;
    this.liveGameChatRoomID = this.sportsGameID + "-chatroom"
    this.userProfileID = localStorage.getItem('profileID');
    this.userUsernameID = localStorage.getItem('usernameID')
    this.chats = await this.getChats(this.liveGameChatRoomID);
    this.gamePlays = await this.getPlays(this.baseballData.id);
    console.log(this.gamePlays)

    this.chats.map(async chat => {
      let profilePicture = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'));
      chat.profilePictureUrl = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + profilePicture.imageurl;
    })
    this.ionViewDidLoad();
    this.userTyped = false;
    document.querySelector<HTMLElement>(".textarea-wrapper").style.minWidth = "100%";
    await this.getProfilePic();

    let playCount;
    timer(0, 20000).pipe(
      switchMap(async () => console.log('currently polling...')),
      takeUntil(this.closeTimer$)
    ).subscribe({
      next: async (res: any) => {
          let playCountPrev = playCount;
          console.log('Previous Play Count: ', playCountPrev)
          this.gamePlays = await this.getPlays(this.baseballData.id)
          playCount = this.gamePlays.length;
          console.log('Current Play Count: ', playCount)
  
          if((playCount !== playCountPrev) && (playCountPrev !== undefined)){
            console.log(this.gamePlays)
            this.newPlays = this.gamePlays.slice(playCountPrev - 1, playCount - 1);
            console.log(this.newPlays)
    
            let timer = setInterval(() => {
              if(this.newPlays.length){
                console.log(this.newPlays.shift)
                this.newPlaysAnimate = this.newPlays.shift();
                console.log(this.newPlaysAnimate)
              } else {
                clearInterval(timer)
              }
            }, 5000)
        } else {
          this.newPlaysAnimate = this.gamePlays[this.gamePlays.length - 1];
        }
        // this.newPlays.forEach((play, index) => {
        //   setTimeout(() => {
        //     this.newPlaysAnimate.push(play[index].resultDescription)
        //     console.log(this.newPlaysAnimate)
        //   }, 2000)
        //   this.newPlaysAnimate.pop();
        // })
      }
    })


  }

  

  ngAfterViewInit(){
    this.ionContent.scrollToBottom();
  }

  backToHub() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  startSubscriptions() {

    this.onUpdateChats = <Subscription>(
      this.api.OnCreateChatsListener().subscribe({
        next: async (event: any) => {
          const data = event;
          data.value.data.onCreateChats.profile.profilePictureUrl = this.profilePicture;
          this.chats.push(data.value.data.onCreateChats);
          setTimeout(() => {
            this.ionContent.scrollToBottom(400);
          }, 500)
        }
      })
    )
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          if (data.value.data.onUpdateSportsGame.id === this.baseballData.id) {
            this.baseballData.currentHalfInning = null;
            this.baseballData = data.value.data.onUpdateSportsGame;
            this.baseballData.gameInfo = JSON.parse(data.value.data.onUpdateSportsGame.gameInfo)
            this.baseballData.gameInfo.currentHalfInning = this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress' ? this.baseballData.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.gameInfo.currentPlay.about.inning.toString()) : null;

            console.log(this.baseballData)

            if (this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress') {
              this.baseballData.currentHalfInning = this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress' ? this.baseballData.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.gameInfo.currentPlay.about.inning.toString()) : null;            }
          }
        }
      })
    )
  }


  async createChat(chatMessage) {
    let time = new Date().toISOString()
    await this.api.CreateChats({chat: chatMessage.chat, timePosted: time, profileID: this.userProfileID, usernameID: this.userUsernameID, sortKey: "chat", liveGameChatRoomID: this.liveGameChatRoomID}).then(response => response).finally(() => {
      this.postChat.reset();
    })
    setTimeout(() => {
      this.ionContent.scrollToBottom(400);
    }, 500)
  }

  async userTypedEvent(event){
    if(event.detail.value.length > 0){
      document.querySelector<HTMLElement>(".textarea-wrapper").style.minWidth = "85%";
      this.userTyped = true;
    } else {
      document.querySelector<HTMLElement>(".textarea-wrapper").style.minWidth = "100%";
      this.userTyped = false;
    }
  }

  async getProfilePic(){
    this.profilePicture = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'));

    // console.log(this.profilePicture)
  
    if(this.profilePicture){
      this.profilePicture = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + this.profilePicture.imageurl;
  
        if(this.profilePicture){
          this.hasProfilePic = true;
        } else {
          this.hasProfilePic = false;
        }
    }
  }

  async ionViewDidLeave() {
    if (this.onUpdateChats) {
      await this.onUpdateChats.unsubscribe();
    }
    if (this.onUpdateHubPost) {
      await this.onUpdateHubPost.unsubscribe();
    }
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
    if (this.onCreateBaseballAtBatIndex) {
      await this.onCreateBaseballAtBatIndex.unsubscribe();
    }

    this.closeTimer$.next(true);
    this.closeTimer$.complete();

  }

  

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';
import { DateSuffixPipe } from 'src/app/pipes/date-suffix.pipe';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';


@Component({
  selector: 'app-baseball-chatroom',
  templateUrl: './baseball-chatroom.page.html',
  styleUrls: ['./baseball-chatroom.page.scss'],
})
export class BaseballChatroomPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  onUpdateChats: Subscription | null = null;
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
    return this.gamePlays;
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

  async ngOnInit() {
    this.startSubscriptions();
    console.log(this.baseballData)
    // this.accordionOpen = false;
    this.userTyped = false;
    this.liveGameChatRoomID = this.sportsGameID + "-chatroom"
    this.userProfileID = localStorage.getItem('profileID');
    this.userUsernameID = localStorage.getItem('usernameID')
    this.chats = await this.getChats(this.liveGameChatRoomID);
    console.log(this.chats)

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


    Hub.listen('api', (data: any) => {
      const { payload } = data;
      console.log(payload)
      if (payload.event === CONNECTION_STATE_CHANGE) {

        if (this.priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
          this.getChats(this.liveGameChatRoomID)
          console.log(this.baseballData)
        }

        this.priorConnectionState = payload.data.connectionState;
        // const connectionState = payload.data.connectionState as ConnectionState;
        // console.log(connectionState)
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
    this.onUpdateHubPost = <Subscription>(
      this.api.OnUpdateHubPostsListener().subscribe({
        next: async (event: any) => {
          const data = event;
        }
      })
    )
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          if (data.value.data.onUpdateSportsGame.id === this.baseballData.id) {
            console.log(this.baseballData.id)
            this.baseballData.losingPitcherStats = [];
            this.baseballData.winningPitcherStats = [];
            this.baseballData.oriolesOutcome = [];
            this.baseballData.currentHalfInning = null;
            this.baseballData = data.value.data.onUpdateSportsGame;
            this.baseballData.gameInfo = JSON.parse(data.value.data.onUpdateSportsGame.gameInfo)
            this.baseballData.gameInfo.currentHalfInning = this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress' ? this.baseballData.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.gameInfo.currentPlay.about.inning.toString()) : null;

            console.log(this.baseballData)
            if (this.baseballData.gameInfo.initialGameData.status.detailedState === 'Final') {
              this.baseballData.oriolesOutcome = (this.baseballData.gameInfo.initialGameData.status.detailedState === 'Final' && (this.baseballData.awayTeam === 'Baltimore Orioles' && this.baseballData.gameInfo.currentPlay.result.awayScore > this.baseballData.gameInfo.currentPlay.result.homeScore) || (this.baseballData.homeTeam === 'Baltimore Orioles' && this.baseballData.gameInfo.currentPlay.result.homeScore > this.baseballData.gameInfo.currentPlay.result.awayScore)) ? "O's WON" : (this.baseballData.gameStatus === 'Final' && (this.baseballData.awayTeam === 'Baltimore Orioles' && this.baseballData.gameInfo.currentPlay.result.awayScore < this.baseballData.gameInfo.currentPlay.result.homeScore) || (this.baseballData.homeTeam === 'Baltimore Orioles' && this.baseballData.gameInfo.currentPlay.result.homeScore < this.baseballData.gameInfo.currentPlay.result.awayScore)) ? "O's LOST" : null;
              this.baseballData.losingPitcherStats = (this.baseballData.gameInfo.finalData && this.baseballData.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(this.baseballData.gameInfo.finalData.loser.id, +this.baseballData.id) as any : null;
              this.baseballData.winningPitcherStats = (this.baseballData.gameStatus === 'Final' && this.baseballData.gameInfo.finalData) ? await this.getFinalPitcherGameStats(this.baseballData.gameInfo.finalData.winner.id, +this.baseballData.id) as any : null;
            }

            if (this.baseballData.gameInfo.initialGameData.status.detailedState === 'Scheduled' || this.baseballData.gameStatus === 'Pre-Game' || this.baseballData.gameStatus === 'Warmup') {
              this.baseballData.startingAwayPitcherStats = ((this.baseballData.gameInfo.initialGameData.status.detailedState !== 'In Progress' && this.baseballData.gameInfo.initialGameData.status.detailedState !== 'Final')) ? await this.getStartingPitcherStats(this.baseballData.gameInfo.initialGameData.probablePitchers.away.id) as any : null;
              this.baseballData.startingHomePitcherStats = ((this.baseballData.gameInfo.initialGameData.status.detailedState !== 'In Progress' && this.baseballData.gameInfo.initialGameData.status.detailedState !== 'Final')) ? await this.getStartingPitcherStats(this.baseballData.gameInfo.initialGameData.probablePitchers.home.id) as any : null;
            }

            if (this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress') {
              this.baseballData.currentHalfInning = this.baseballData.gameInfo.initialGameData.status.detailedState === 'In Progress' ? this.baseballData.gameInfo.currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.gameInfo.currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.gameInfo.currentPlay.about.inning.toString()) : null;            }
          }
        }
      })
    )
  }

  async getFinalPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherFinalData(playerId, gamePk).then(data => data);
  }

  async getStartingPitcherStats(playerId) {
    return await this.sportsService.getPitcherSeasonData(playerId).then(data => data);
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

  // async ngOnDestroy() {
  //   if (this.onUpdateChats) {
  //     await this.onUpdateChats.unsubscribe();
  //   }
  //   if (this.onUpdateHubPost) {
  //     await this.onUpdateHubPost.unsubscribe();
  //   }
  //   if (this.onUpdateSportsGame) {
  //     await this.onUpdateSportsGame.unsubscribe();
  //   }

  // }

  

}

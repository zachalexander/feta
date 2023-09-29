import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';


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
  
  baseballData;
  sportsGameID;
  liveGameChatRoomID;
  accordionOpen;

  userProfileID;
  userUsernameID;

  chats = [];
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


  openAccordion(){

    if(!this.accordionOpen){
      let d = document.getElementById("accordion")
      d.classList.remove("accordion-collapsed")
      d.classList.remove("accordion-animated")
      d.className += "ios hydrated"
      d.className += " accordion-expanded"
      this.accordionOpen = true;
    } else {
      let d = document.getElementById("accordion")
      d.classList.remove("accordion-expanded")
      d.className = " accordion-collapsed"
      this.accordionOpen = false;
    }
  }

  async getChats(livegamechatroomid){
    return await this.api.ChatsByLiveGameChatRoomIDAndTimePosted(livegamechatroomid, null, ModelSortDirection.ASC).then(data => data)
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.ionContent.scrollToBottom(50);
    }, 50)
  }

  async ngOnInit() {
    this.accordionOpen = false;
    this.startSubscriptions();
    this.liveGameChatRoomID = this.sportsGameID + "-chatroom"
    this.userProfileID = localStorage.getItem('profileID');
    this.userUsernameID = localStorage.getItem('usernameID')
    this.chats = await this.getChats(this.liveGameChatRoomID) as any;
    this.ionViewDidLoad();
    console.log(this.chats)
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
          data.value.data.onCreateChats.profile.profilePictureUrl = await Storage.get('profile-pictures/' + await (await this.api.GetProfilePictureProfileID(data.value.data.onCreateChats.profile.id)).imageurl)
          this.chats.push(data.value.data.onCreateChats);
          this.ionContent.scrollToBottom().then(() => console.log('scrolled to bottom!'))
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
            console.log(data.value.data.onUpdateSportsGame)
            this.baseballData.losingPitcherStats = [];
            this.baseballData.winningPitcherStats = [];
            this.baseballData.oriolesOutcome = [];
            this.baseballData.currentHalfInning = null;
            this.baseballData.currentBatterStats = [];
            this.baseballData.currentPitcherStats = [];
            this.baseballData = data.value.data.onUpdateSportsGame;
            this.baseballData.basicGameInfo = JSON.parse(data.value.data.onUpdateSportsGame.basicGameInfo)
            this.baseballData.currentHalfInning = this.baseballData.gameStatus === 'In Progress' ? this.baseballData.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.basicGameInfo[0].currentPlay.about.inning.toString()) : null;

            if (this.baseballData.gameStatus === 'Final') {
              this.baseballData.oriolesOutcome = (this.baseballData.gameStatus === 'Final' && (this.baseballData.awayTeam === 'Baltimore Orioles' && this.baseballData.basicGameInfo[0].currentPlay.result.awayScore > this.baseballData.basicGameInfo[0].currentPlay.result.homeScore) || (this.baseballData.homeTeam === 'Baltimore Orioles' && this.baseballData.basicGameInfo[0].currentPlay.result.homeScore > this.baseballData.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (this.baseballData.gameStatus === 'Final' && (this.baseballData.awayTeam === 'Baltimore Orioles' && this.baseballData.basicGameInfo[0].currentPlay.result.awayScore < this.baseballData.basicGameInfo[0].currentPlay.result.homeScore) || (this.baseballData.homeTeam === 'Baltimore Orioles' && this.baseballData.basicGameInfo[0].currentPlay.result.homeScore < this.baseballData.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
              this.baseballData.losingPitcherStats = (this.baseballData.basicGameInfo[0].finalData && this.baseballData.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(this.baseballData.basicGameInfo[0].finalData.loser.id, +this.baseballData.id) as any : null;
              this.baseballData.winningPitcherStats = (this.baseballData.gameStatus === 'Final' && this.baseballData.basicGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(this.baseballData.basicGameInfo[0].finalData.winner.id, +this.baseballData.id) as any : null;
            }

            if (this.baseballData.gameStatus === 'Scheduled' || this.baseballData.gameStatus === 'Pre-Game' || this.baseballData.gameStatus === 'Warmup') {
              this.baseballData.startingAwayPitcherStats = ((this.baseballData.gameStatus !== 'In Progress' && this.baseballData.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(this.baseballData.basicGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
              this.baseballData.startingHomePitcherStats = ((this.baseballData.gameStatus !== 'In Progress' && this.baseballData.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(this.baseballData.basicGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
            }

            if (this.baseballData.gameStatus === 'In Progress') {
              this.baseballData.currentHalfInning = this.baseballData.gameStatus === 'In Progress' ? this.baseballData.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(this.baseballData.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", this.baseballData.basicGameInfo[0].currentPlay.about.inning.toString()) : null;
              this.baseballData.currentBatterStats = (this.baseballData.gameStatus !== 'Final' && this.baseballData.basicGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(this.baseballData.basicGameInfo[0].currentPlay.matchup.batter.id, +this.baseballData.id) as any : null;
              this.baseballData.currentPitcherStats = (this.baseballData.gameStatus !== 'Final' && this.baseballData.basicGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(this.baseballData.basicGameInfo[0].currentPlay.matchup.pitcher.id, +this.baseballData.id) as any : null;
            }
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

  async getCurrentBatterGameStats(playerId, gamePk) {
    return await this.sportsService.getBatterData(playerId, gamePk).then(data => data);
  }

  async getCurrentPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherData(playerId, gamePk).then(data => data);
  }

  async createChat(chatMessage) {
    let time = new Date().toISOString()
    await this.api.CreateChats({chat: chatMessage.chat, timePosted: time, profileID: this.userProfileID, usernameID: this.userUsernameID, sortKey: "chat", liveGameChatRoomID: this.liveGameChatRoomID}).then(response => response).finally(() => {
      this.postChat.reset();
    })
    this.ionContent.scrollToBottom(400);
  }

}

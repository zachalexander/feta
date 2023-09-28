import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-baseball-chatroom',
  templateUrl: './baseball-chatroom.page.html',
  styleUrls: ['./baseball-chatroom.page.scss'],
})
export class BaseballChatroomPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  
  baseballData;
  sportsGameID;
  accordionOpen;

  constructor(
    private modalController: ModalController,
    private api: APIService,
    private sportsService: SportsService
  ) { }


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

  ngOnInit() {
    this.accordionOpen = false;
    this.startSubscriptions();
  }

  backToHub() {
    this.modalController.dismiss({
      'dismissed': true
    });
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
          console.log(this.baseballData)
          console.log(data)
          // this.hubData.map(async (game) => {
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
          // })
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

}

import { Component, Input, ViewChild, AfterViewInit, OnChanges, ElementRef, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { ActivatedRoute, ActivationStart, NavigationStart } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, finalize } from 'rxjs';
import { Auth } from 'aws-amplify'
import { Router } from '@angular/router';
import { FA, ModelSortDirection } from 'src/app/FA.service';
import { ModalController } from '@ionic/angular';
import { CreateProfileModalPage } from '../../modals/create-profile-modal/create-profile-modal.page'
import { LoadingController } from '@ionic/angular';
import { ProfileMenuModalPage } from 'src/app/modals/profile-menu-modal/profile-menu-modal.page';
import { UsersListModalPage } from 'src/app/modals/users-list-modal/users-list-modal.page';
import { TermsOfServiceModalPage } from 'src/app/modals/terms-of-service-modal/terms-of-service-modal.page';
import { AppWhyModalPage } from 'src/app/modals/app-why-modal/app-why-modal.page';
import { AppRulesModalPage } from 'src/app/modals/app-rules-modal/app-rules-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;

  username_tab;
  urlUser;
  homeclick;
  timelineclick;
  messageclick;
  profileclick;
  needRegister;
  profilePicture;
  hasProfilePic: boolean;

  @Input() name?: string;
  @ViewChild('latestVideo') private video: any;
  fetaProfileCount: number;
  already_registered;
  createProfile = false;
  errorPage = false;
  username;
  profilepicid;
  browserName = '';
  lastTimelinePost;
  mobilePlatform;
  nowPlaying = null;
  videoOver = false;
  muted = true;
  replay = false;
  pause;

  constructor(
    private api: APIService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fa: FA,
    public modalController: ModalController,
    public loadingController: LoadingController
  ) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart){
        if(event.url !== '/message-board'){
          this.onUpdateSportsGame.unsubscribe();
        }
      }
    })
  }
  
  async ngOnInit(){

    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe(data => data)
    )

    localStorage.setItem('User-browser', this.browserName)

    // grab the url to update tab highlighting
    let url = this.activatedRoute.snapshot['_routerState'].url;

    if(url === '/home'){
      this.homeClick();
    } else if(url === '/timeline'){
      this.timelineClick();
    } else if(url === '/message-board'){
      this.messageClick();
    } else if (url.includes('profile')) {
      this.profileClick();
    }

    // setTimeout(async () => {
      this.username_tab = localStorage.getItem('username')
      if(!this.username_tab){
        this.needRegister = true;
      } else {
  
        this.needRegister = false;
        this.username_tab = localStorage.getItem('username');
  
        this.profilePicture = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'));
    
        if(this.profilePicture){
          this.profilePicture = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + this.profilePicture.imageurl;
  
            if(this.profilePicture){
              this.hasProfilePic = true;
            } else {
              this.hasProfilePic = false;
            }
        }
      }
    // }, 500)
  }

  async ngOnDestroy() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
    if (this.onUpdateHubPost) {
      await this.onUpdateHubPost.unsubscribe();
    }
  }

  homeClick(){
    this.homeclick = true;
    this.timelineclick = false;
    this.messageclick = false;
    this.profileclick = false;
  }

  timelineClick(){
    this.homeclick = false;
    this.timelineclick = true;
    this.messageclick = false;
    this.profileclick = false;

  }

  messageClick(){
    this.homeclick = false;
    this.timelineclick = false;
    this.messageclick = true;
    this.profileclick = false;

  }

  profileClick(){
    this.homeclick = false;
    this.timelineclick = false;
    this.messageclick = false;
    this.profileclick = true;
  }


}


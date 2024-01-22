import { Component, Input, ViewChild, AfterViewInit, OnChanges, ElementRef, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify'
import { Router } from '@angular/router';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { ModalController } from '@ionic/angular';
import { CreateProfileModalPage } from '../../modals/create-profile-modal/create-profile-modal.page'
import { LoadingController } from '@ionic/angular';
import { ProfileMenuModalPage } from 'src/app/modals/profile-menu-modal/profile-menu-modal.page';
import { UsersListModalPage } from 'src/app/modals/users-list-modal/users-list-modal.page';
import { TermsOfServiceModalPage } from 'src/app/modals/terms-of-service-modal/terms-of-service-modal.page';
import { AppWhyModalPage } from 'src/app/modals/app-why-modal/app-why-modal.page';
import { AppRulesModalPage } from 'src/app/modals/app-rules-modal/app-rules-modal.page';
import { IonInfiniteScroll, IonRefresher, IonRefresherContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() name?: string;
  @ViewChild('latestVideo') private video: any;
  // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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
    private router: Router, 
    private api: APIService,
    public modalController: ModalController,
    public loadingController: LoadingController
  ){}

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateProfileModalPage
    });

    return await modal.present();
  }

  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  async getLatestTimelinePost(){
    return this.api.ImagePostsBySorterValueAndTime_posted("media", null, ModelSortDirection.DESC, null, 1)
  }

  async ngOnInit() {

    this.browserName = this.detectBrowserName();

    localStorage.setItem('User-browser', this.browserName)

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present().then(async () => {
      await this.loadUserData();
      await this.listProfiles();
      this.lastTimelinePost = await this.getLatestTimelinePost() as any;
      this.lastTimelinePost = this.lastTimelinePost.items[0];
      console.log(this.lastTimelinePost)
    });
    
    loading.dismiss();

    setTimeout(() => {
      this.didScroll();
    }, 2000)
  }

  async signOut(){
    const currentUser = await Auth.currentUserPoolUser();
    await currentUser.signOut()
    await localStorage.clear()
    await this.router.navigate(['/login']).then(() => { window.location.reload()})
  }

  async listProfiles() {
    let profiles = await this.api.ListProfiles();
    this.fetaProfileCount = profiles.items.length;
  }

  toTimeline(){
    this.router.navigate(['/timeline']).then(() => { window.location.reload() })
  }

  async loadUserData() {    
    try {
      let cognitoid = await (await Auth.currentUserCredentials()).identityId
      let profile = await this.api.GetUserProfileFromCognitoId(cognitoid)


      if(profile && cognitoid){
        this.already_registered = true; 
        this.profilepicid = profile.profilepictureID;
        this.username = await this.api.GetUsernameFromProfileId(profile.id);

        await localStorage.setItem('usernameID', profile.usernameID);
        await localStorage.setItem('cognitoID', cognitoid);
        await localStorage.setItem('username', this.username);
        await localStorage.removeItem('amplify-signin-with-hostedUI');
        await localStorage.removeItem('CognitoIdentityServiceProvider.4hiv9l2c4ir7n1e0j419o92qhf.c3f1ee96-6e6e-41cd-9e3d-ff1ce38ea8c9.clockDrift');
        await localStorage.setItem('profileID', profile.id);
        
      } else if(!cognitoid && !profile) {
        await this.router.navigate(['/login']).then(() => { window.location.reload()})
        await this.router.navigate(['/login']).then(() => { window.location.reload()})
      } else if(!cognitoid){
        await this.router.navigate(['/login']).then(() => { window.location.reload()})
      } else if(cognitoid && !profile) {
        console.log('cognitoID found, but no profile!')
        this.already_registered = false;
        this.createProfile = true;
      } else {
        await this.router.navigate(['/login']).then(() => { window.location.reload()})
      }
    }
    catch (error) {
      console.log(error)
      this.errorPage = true;
    }

}

async openMenu() {
  const modal = await this.modalController.create({
    component: ProfileMenuModalPage
  })
  return await modal.present();
}

async openUsersList(){
  const modal = await this.modalController.create({
    component: UsersListModalPage
  })
  return await modal.present();
}

async openTerms() {
  const modal = await this.modalController.create({
    component: TermsOfServiceModalPage
  })
  return await modal.present();
}

async openRules() {
  const modal = await this.modalController.create({
    component: AppRulesModalPage
  })
  return await modal.present();
}

async openTheWhy() {
  const modal = await this.modalController.create({
    component: AppWhyModalPage
  })
  return await modal.present();
}

async uploadProfilePic(){
  await this.router.navigate(['/profile-picture']).then(() => { window.location.reload()})
}

async attemptReLogin() {
  const currentUser = await Auth.currentUserPoolUser();
  await currentUser.signOut()
  await localStorage.clear()
  await this.router.navigate(['/login']).then(() => { window.location.reload() })
}


  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  didScroll() {
    if (this.nowPlaying && this.isElementInViewport(this.nowPlaying)) return;
    else if (this.nowPlaying && !this.isElementInViewport(this.nowPlaying)) {
      this.nowPlaying.pause();
      this.nowPlaying = null;
      this.pause = true;
      this.replay = false;
    }

    if (this.nowPlaying) return;
    const nativeElement = this.video.nativeElement;
    const inView = this.isElementInViewport(nativeElement);

    if (inView) {
      this.nowPlaying = nativeElement;
      this.nowPlaying.muted = true;
      let playPromise = this.nowPlaying.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          this.nowPlaying.play();
        })
          .catch(error => {
            this.nowPlaying.play();
            console.log(error)
          })
      }
      this.pause = false;
      this.muted = true;
      this.replay = false;
      this.videoOver = false;
    }
  }


  videoEnd() {
    this.replay = true;
    this.pause = true;
  }

  replayVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.play();
      this.nowPlaying.muted = false;
      this.muted = false;
      this.replay = false;
      this.pause = false;
    }
  }

  pauseVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.pause();
      this.nowPlaying.muted = true;
      this.replay = false;
      this.muted = true;
      this.pause = true;
    }
  }

  playVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.nowPlaying.play();
      this.replay = false;
      this.muted = false;
      this.pause = false;
    }
  }

  unmuteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.muted = false;
    }
  }

  muteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = true;
      this.muted = true;
    }
  }

}

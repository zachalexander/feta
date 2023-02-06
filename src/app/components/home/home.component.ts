import { Component, Input } from '@angular/core';
import { Auth } from 'aws-amplify'
import { Router } from '@angular/router';
import { APIService } from '../../API.service';
import { ModalController } from '@ionic/angular';
import { CreateProfileModalPage } from '../../modals/create-profile-modal/create-profile-modal.page'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  @Input() name?: string;
  already_registered;
  createProfile = false;
  username;
  profilepicid;
  browserName = '';

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

  async ngOnInit(){

    this.browserName = this.detectBrowserName();

    localStorage.setItem('User-browser', this.browserName)

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    await this.loadUserData();

    loading.dismiss();
  }

  async signOut(){
    const currentUser = await Auth.currentUserPoolUser();
    await currentUser.signOut()
    await localStorage.clear()
    await this.router.navigate(['/login']).then(() => { window.location.reload()})
  }

  async loadUserData() {

    
    try {
      let cognitoid = await (await Auth.currentUserCredentials()).identityId
      let profile = await this.api.GetUserProfileFromCognitoId(cognitoid)

      if(profile && cognitoid){
        this.already_registered = true; 
        this.profilepicid = profile.profilepictureID;
        this.username = await this.api.GetUsernameFromProfileId(profile.id);

        await localStorage.setItem('usernameID', profile.usernameID)
        await localStorage.setItem('cognitoID', cognitoid)
        await localStorage.setItem('username', this.username)
        await localStorage.removeItem('amplify-signin-with-hostedUI')
        await localStorage.removeItem('CognitoIdentityServiceProvider.4hiv9l2c4ir7n1e0j419o92qhf.c3f1ee96-6e6e-41cd-9e3d-ff1ce38ea8c9.clockDrift')
        await localStorage.setItem('profileID', profile.id)
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
       await this.router.navigate(['/login']).then(() => { window.location.reload()})
    }

}

async uploadProfilePic(){
  await this.router.navigate(['/profile-picture']).then(() => { window.location.reload()})
}

}

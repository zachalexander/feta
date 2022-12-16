import { Component, Input } from '@angular/core';
import { Auth } from 'aws-amplify'
import { Router } from '@angular/router';
import { APIService } from '../../API.service';
import { ModalController } from '@ionic/angular';
import { CreateProfileModalPage } from '../../modals/create-profile-modal/create-profile-modal.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  @Input() name?: string;
  already_registered = false;
  createProfile = false;

  constructor(
    private router: Router, 
    private api: APIService,
    public modalController: ModalController
  ){}

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateProfileModalPage
    });

    return await modal.present();
  }

  ngOnInit(){
    this.loadUserData();
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
      console.log(cognitoid)
      let profile = await this.api.GetUserProfileFromCognitoId(cognitoid)
      console.log(profile)

      if(profile && cognitoid){
        // this.already_registered = true; 
        // this.username = await this.api.GetUsernameFromProfileId(profile.id);
        // this.profilepicid = profile.profilepictureID

        // await localStorage.setItem('usernameID', profile.usernameID)
        // await localStorage.setItem('cognitoID', cognitoid)
        // await localStorage.setItem('username', this.username)
        // await localStorage.removeItem('amplify-signin-with-hostedUI')
        // await localStorage.removeItem('CognitoIdentityServiceProvider.4hiv9l2c4ir7n1e0j419o92qhf.c3f1ee96-6e6e-41cd-9e3d-ff1ce38ea8c9.clockDrift')
        // await localStorage.setItem('profileID', profile.id)
        // this.authState = await AuthState.SignedIn;
        // this.loaded = true;
      } else if(!cognitoid && !profile) {
        // this.authState = await AuthState.SignedOut;
        // this.loaded = true;
        await this.router.navigate(['/login']).then(() => { window.location.reload()})
      } else if(!cognitoid){
        // this.authState = await AuthState.SignedOut;
        // this.loaded = true;
        // await this.router.navigate(['/login']).then(() => { window.location.reload()})
      } else if(cognitoid && !profile) {
        console.log('cognitoID found, but no profile!')
        this.already_registered = false;
        this.createProfile = true;
        // this.loaded = true;
      } else {
        // this.loaded = true;
      }
    }
    catch (error) {
      // this.authState = AuthState.SignedOut;
      // this.loaded = true;
      // this.already_registered = false;
    }

}

}

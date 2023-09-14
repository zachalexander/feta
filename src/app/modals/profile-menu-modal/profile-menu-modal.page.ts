
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { APIService } from 'src/app/API_backup_sept14.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu-modal.page.html',
  styleUrls: ['./profile-menu-modal.page.scss'],
})
export class ProfileMenuModalPage implements OnInit {

  profile_set: any;
  authState = undefined;
  profile;
  username;

  constructor(private router: Router, private modalController: ModalController, private api: APIService) { }

  async ngOnInit() {

    this.profile = await this.api.GetProfile(localStorage.getItem('profileID'));
    this.username = await this.api.GetUsernameFromProfileId(this.profile.id);

  }

  async backToProfile(){
    this.modalController.dismiss();
  }

  async signOut(){
    try {
      const currentUser = await Auth.currentUserPoolUser();
      await currentUser.signOut()
      await localStorage.clear()
      await this.router.navigate(['/login']).then(() => { window.location.reload()})

    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

}

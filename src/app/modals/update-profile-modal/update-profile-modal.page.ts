import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from '../../services/customvalidation.service';
import { MediaService } from 'src/app/services/media.service';
import { APIService } from 'src/app/API.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.page.html',
  styleUrls: ['./update-profile-modal.page.scss'],
})
export class UpdateProfileModalPage implements OnInit {

  public updateProfileForm: FormGroup;
  username: String;
  family_name: String;
  relation: String;
  currentUserProfile: any;
  profilePic: any;

  constructor(private modalController: ModalController, 
    private customValidator: CustomvalidationService, 
    private fb: FormBuilder, 
    private api: APIService,
    private router: Router,
    private mediaService: MediaService,
    public loadingController: LoadingController
    ) {
    this.updateProfileForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)], this.customValidator.userNameValidator.bind(this.customValidator)],
      relation: [""],
      family_name: [""]
    });
   }

   get f(){
    return this.updateProfileForm.controls;
  }

  async ngOnInit() {

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    // get current user information
    this.currentUserProfile = await this.api.GetProfile(localStorage.getItem('profileID'));

    this.username = await localStorage.getItem('username');
    this.family_name = this.currentUserProfile.family_name;
    this.relation = this.currentUserProfile.relation;

    this.updateProfileForm.controls['username'].setValue(this.username)
    this.updateProfileForm.controls['family_name'].setValue(this.family_name)
    this.updateProfileForm.controls['relation'].setValue(this.relation)

    let imageurl = await (await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'))).imageurl

    if(imageurl){
      this.profilePic = await this.mediaService.getPhotoUrl(imageurl)
    } else {
      this.profilePic = false;
    }

    setTimeout(() => {
      loading.dismiss();
    }, 2000)
  }

  async backToProfile(){
    this.modalController.dismiss({
      'dismissed': true,
      'formStatus': 'markAsUntouched',
      'noInput': true
    });
  }

  public async onUpdate(profile: any) {

    let usernameData = await this.api.GetUsernameDataFromProfileId(this.currentUserProfile.id);
    let profileVersion = await (await this.api.GetProfile(localStorage.getItem('profileID')))._version;

    let updateUsername = new Promise(resolve => {
      resolve(this.api.UpdateUsername({id: usernameData.id, username: profile.username, _version: usernameData._version}))
    })
    
    let updateProfilePromise = new Promise(resolve => {
      resolve(updateUsername.then(() => {this.api.UpdateProfile({id: usernameData.profileID, family_name: profile.family_name, relation: profile.relation, _version: profileVersion })}))
    })

    await localStorage.removeItem('username')
    await localStorage.setItem('username', profile.username)
    
    updateProfilePromise.then(() => {
      this.router.navigate(['/profile', profile.username]).then(() => { window.location.reload()});
    }).catch((e) => {
      console.log("error updating profile...", e);
    });

  }

  relationChange(relation) {
    this.relation = relation.detail.value;
  }

  changeProfilePhoto() {
    this.router.navigate(['/profile-picture']).then(() => { window.location.reload()})
  }

}

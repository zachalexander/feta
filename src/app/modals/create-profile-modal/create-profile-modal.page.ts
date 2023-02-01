import { Component, OnInit, ViewChild , ViewEncapsulation, AfterContentChecked} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { APIService } from "../../API.service";
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from '../../services/customvalidation.service';
// import { PhotoService } from '../../services/photo.service';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Auth } from '@aws-amplify/auth';
import 'hammerjs';

import SwiperCore, { SwiperOptions, Pagination, EffectFade, Navigation } from 'swiper';
SwiperCore.use([Pagination, EffectFade, Navigation])

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.page.html',
  styleUrls: ['./create-profile-modal.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProfileModalPage implements OnInit{
  @ViewChild('createProfileSwiper', { static: false}) createProfileSwiper: SwiperComponent;
  slideOpts: SwiperOptions = {};
  modalTitle: string;
  email: any;
  cognitoID: any;
  modelId: number;
  createProfileForm = {} as FormGroup;
  relationship: any;
  username: any;
  family_name: any;
  relation: any;
  reviewClick = false;


  constructor(
    private api: APIService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private customValidator: CustomvalidationService
  ) {
    this.createProfileForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)], this.customValidator.userNameValidator.bind(this.customValidator)),
      family_name: new FormControl(''),
      relation: new FormControl(''),
      email: new FormControl('')
      }
    );
   }

   get f(){
    return this.createProfileForm.controls;
  }

  animation() {
    this.slideOpts = {
      pagination: { clickable: false },
      keyboard: { enabled: true },
      allowTouchMove: false,
      simulateTouch: false,
      navigation: { 
        nextEl: 'next-button',
        prevEl: 'previous-button'
      },
      spaceBetween: 30,
      effect: 'slide'
    }
  }


  async ngOnInit() {
    this.reviewClick = false;
    this.email = await Auth.currentUserInfo().then(user => user.attributes.email);
    this.cognitoID = await Auth.currentUserInfo().then(user => user.id);
    this.animation();
  }

  nextSlide(){
    this.createProfileSwiper.swiperRef.slideNext(200);
  }

  previousSlide(){
    this.createProfileSwiper.swiperRef.slidePrev(200);
  }

 async closeModal(profile) {

    profile.email = this.email;
    profile.cognitoID = this.cognitoID;

    await this.createProfile({usernameID: '', cognitoID: profile.cognitoID, email: profile.email, family_name: profile.family_name, relation: profile.relation})

    let newProfile = await this.api.GetUserProfileFromCognitoId(this.cognitoID);

    await this.createUsername({username: profile.username, profileID: newProfile.id})

    let newUsername = await this.api.GetUsernameDataFromProfileId(newProfile.id)

    await this.api.UpdateProfile({id: newUsername.profileID, usernameID: newUsername.id}).then(() => {
      this.router.navigate(['/home']).then(() => { window.location.reload()});
    })
  }

  relationChange(relation) { 
    this.relationship = relation.detail.value;
  }

  async createProfile(profile){
    await this.api.CreateProfile(profile).then(() => {});
  }

  async createUsername(username){
    await this.api.CreateUsername(username).then(() => {})
  }

  reviewEntry(){
    this.reviewClick = true;
  }

  backToHome(){
    this.router.navigate(['/home']).then(() => { window.location.reload()});
  }

  


}

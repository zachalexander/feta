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
import { PickerController } from '@ionic/angular';

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
  dateSelected;
  dateShown;
  monthSelected;
  monthShown;


  constructor(
    private api: APIService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private customValidator: CustomvalidationService,
    private pickerCtrl: PickerController
  ) {
    this.createProfileForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)], this.customValidator.userNameValidator.bind(this.customValidator)),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
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

  async openPickerMonth() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'date',
          options: [
            { text: "January", value: 1 },
            { text: "February", value: 2 },
            { text: "March", value: 3 },
            { text: "April", value: 4 },
            { text: "May", value: 5 },
            { text: "June", value: 6 },
            { text: "July", value: 7 },
            { text: "August", value: 8 },
            { text: "September", value: 9 },
            { text: "October", value: 10 },
            { text: "November", value: 11 },
            { text: "December", value: 12 }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(value)
            this.monthSelected = true;
            this.monthShown = value;
          }
        }
      ]
    })
    await picker.present();
  }

  async openPickerDay(){
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'date',
          options: [
            { text: "1st", value: 1},
            { text: "2nd", value: 2 },
            { text: "3rd", value: 3 },
            { text: "4th", value: 4 },
            { text: "5th", value: 5 },
            { text: "6th", value: 6 },
            { text: "7th", value: 7 },
            { text: "8th", value: 8 },
            { text: "9th", value: 9 },
            { text: "10th", value: 10 },
            { text: "11th", value: 11 },
            { text: "12th", value: 12 },
            { text: "13th", value: 13 },
            { text: "14th", value: 14 },
            { text: "15th", value: 15 },
            { text: "16th", value: 16 },
            { text: "17th", value: 17 },
            { text: "18th", value: 18 },
            { text: "19th", value: 19 },
            { text: "20th", value: 20 },
            { text: "21st", value: 21 },
            { text: "22nd", value: 22 },
            { text: "23rd", value: 23 },
            { text: "24th", value: 24 },
            { text: "25th", value: 25 },
            { text: "26th", value: 26 },
            { text: "27th", value: 27 },
            { text: "28th", value: 28 },
            { text: "29th", value: 29 },
            { text: "30th", value: 30 },
            { text: "31st", value: 31 }
          ]
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.dateSelected = true;
            this.dateShown = value;
          }
        }
      ]
    })
    await picker.present();
  }

  async ngOnInit() {
    this.dateSelected = false;
    this.monthSelected = false;
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

    profile.birthmonth = this.monthShown.date.value
    profile.birthday = this.dateShown.date.value
    profile.birthday_actual = new Date(2000, (profile.birthmonth - 1), profile.birthday)

    await this.createProfile({usernameID: '', cognitoID: profile.cognitoID, email: profile.email, first_name: profile.first_name, last_name: profile.last_name, birthday: profile.birthday_actual, relation: profile.relation})

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

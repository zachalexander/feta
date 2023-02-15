import { DateSuffix } from 'src/app/pipes/date-suffix.pipe';
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, LoadingController, PickerController } from '@ionic/angular';
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
  first_name: String;
  last_name: String;
  bio;
  birthday;
  birthmonth;
  birthdate;
  relation: String;
  currentUserProfile: any;
  profilePic: any;
  profile;
  dateSelected;
  monthSelected;
  dateShown;
  monthShown;
  dateShownChanged;
  monthShownChanged;
  dateAdjust;
  monthAdjust;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(private modalController: ModalController, 
    private customValidator: CustomvalidationService, 
    private fb: FormBuilder, 
    private api: APIService,
    private router: Router,
    private mediaService: MediaService,
    public loadingController: LoadingController,
    public pickerCtrl: PickerController
    ) {
    this.updateProfileForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(2)], this.customValidator.userNameValidator.bind(this.customValidator)],
      relation: [""],
      first_name: [""],
      last_name: [""],
      bio: [""]
    });
   }

   get f(){
    return this.updateProfileForm.controls;
  }



  async openPickerMonth() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'date',
          options: [
            { text: "January", value: 0 },
            { text: "February", value: 1 },
            { text: "March", value: 2 },
            { text: "April", value: 3 },
            { text: "May", value: 4 },
            { text: "June", value: 5 },
            { text: "July", value: 6 },
            { text: "August", value: 7 },
            { text: "September", value: 8 },
            { text: "October", value: 9 },
            { text: "November", value: 10 },
            { text: "December", value: 11 }
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
            this.monthAdjust = true;
            this.monthShownChanged = value;
            console.log(this.monthShownChanged);
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
            this.dateAdjust = true;
            this.dateShownChanged = value;
            console.log(this.dateShownChanged)
          }
        }
      ]
    })
    await picker.present();
  }

  createDateSuffix(value){
      let suffix = 'th';

      if (value === 1 || value === 21 || value === 31) {
        suffix = 'st'
      } else if (value === 2 || value === 22) {
        suffix = 'nd';
      } else if (value === 3 || value === 23) {
        suffix = 'rd';
      }
      return suffix;
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    this.dateAdjust = false;
    this.monthAdjust = false;

    // get current user information
    this.currentUserProfile = this.profile;

    this.username = this.profile.username;
    this.first_name = this.currentUserProfile.first_name;
    this.last_name = this.currentUserProfile.last_name;
    this.birthday = this.currentUserProfile.birthday;
    this.relation = this.currentUserProfile.relation;
    this.bio = this.currentUserProfile.bio;

    this.birthday = new Date(this.birthday)
    this.birthmonth = this.birthday.getMonth()
    this.birthdate = this.birthday.getDate()

    if(!this.birthday){
      this.dateSelected = false;
      this.monthSelected = false;
    } else {
      this.monthShown = {date: {text: this.months[this.birthmonth], value: this.birthmonth}};
      this.dateShown = {date: {text: this.birthdate.toString() + this.createDateSuffix(this.birthdate), value: this.birthdate}};
      this.dateSelected = true;
      this.monthSelected = true;
    }

    this.updateProfileForm.controls['username'].setValue(this.username)
    this.updateProfileForm.controls['first_name'].setValue(this.first_name)
    this.updateProfileForm.controls['last_name'].setValue(this.last_name)
    this.updateProfileForm.controls['relation'].setValue(this.relation)
    this.updateProfileForm.controls['bio'].setValue(this.bio)

    if(this.currentUserProfile.profilepicture){
      let imageurl = 'https://ik.imagekit.io/bkf4g8lrl/profile-photos/' + this.currentUserProfile.profilepicture.imageurl;
      this.profilePic = imageurl;
      loading.dismiss();
    } else {
      this.profilePic = false;
      loading.dismiss();
    }
  }

  async backToProfile(){
    this.modalController.dismiss({
      'dismissed': true,
      'formStatus': 'markAsUntouched',
      'noInput': true
    });
  }

  public async onUpdate(profile: any) {

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    let updateUsername = new Promise(resolve => {
      resolve(this.api.UpdateUsername({id: this.profile.usernameID, username: profile.username}))
    })

    if(this.dateAdjust){
      this.dateShown = this.dateShownChanged;
    }

    if(this.monthAdjust){
      this.monthShown = this.monthShownChanged;
    }

    profile.birthday_actual = new Date(2000, (this.monthShown.date.value), this.dateShown.date.value)
    
    await new Promise(resolve => {
      resolve(updateUsername.then(() => {this.api.UpdateProfile({id: this.profile.id, first_name: profile.first_name, last_name: profile.last_name, birthday: profile.birthday_actual, relation: profile.relation, bio: profile.bio})}))
    }).then(() => {
      this.router.navigate(['/profile', profile.username]).then(() => { window.location.reload()});
      loading.dismiss();
    }).catch((e) => {
      console.log("error updating profile...", e);
    });


    await localStorage.removeItem('username')
    await localStorage.setItem('username', profile.username)
    
  }

  relationChange(relation) {
    this.relation = relation.detail.value;
  }

  changeProfilePhoto() {
    this.router.navigate(['/profile-picture']).then(() => { window.location.reload()})
  }

}

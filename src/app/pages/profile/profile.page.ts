import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { ModalController } from '@ionic/angular';
import { UpdateProfileModalPage } from 'src/app/modals/update-profile-modal/update-profile-modal.page';
import { MediaService } from 'src/app/services/media.service';
import { LoadingController } from '@ionic/angular';
import { ProfileMenuModalPage } from 'src/app/modals/profile-menu-modal/profile-menu-modal.page';



@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  urlUser: string;
  usernameID: string;
  userData: any;
  urlUserProfile: any;
  relationship_change: any;
  profilePhoto: any;
  editAccess: boolean;
  loaded = false;
  button_actions: string = "photos"
  select_buttons: string = "photo-uploads";
  photosPostedCount: number;
  profileData: any = {};
  profileImageData: Array<any> = new Array();
  noPhotosYet;

  constructor(
    private api: APIService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private mediaService: MediaService,
    public loadingController: LoadingController
  ) {}

  async ngOnInit() {

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    
    // grab the username from the url
    this.activatedRoute.params.subscribe((params) => this.urlUser = params['username']);

    console.log(this.urlUser)

    let profileID = await this.api.GetUsernameProfile(this.urlUser)
    let profile = await this.api.GetProfile(profileID);
    this.profileData = profile;

    // get the url username profile data
    this.urlUserProfile = profile;

    // get current user information
    let currentUserUsername = await localStorage.getItem('username');

    // add edit profile button if on personal profile
    if(this.urlUser === currentUserUsername) {
      this.editAccess = true;
    }

    // find all (non-deleted) pictures user has posted on the family wall
    let userData: any = await this.api.getUserProfileImageData(this.urlUserProfile.id).then(data => data);

    // find number of photos posted by zach or katie
    this.photosPostedCount = userData[1];
   
    if(this.photosPostedCount == 0){
      this.noPhotosYet = true;
    } else {
      this.noPhotosYet = false;
    }

    if(userData){
      // sort photos by time posted
      userData[0] = await this.sortByDate(userData[0]);
  
      // get actual photo url from storage
      userData[0] = await this.mediaService.getPhotoUrlsKey(userData[0])
  
      // save profile data to object to render
      this.profileImageData = userData[0];
      this.profileData.username = await this.api.GetUsernameFromProfileId(this.profileData.id).then(async username => username);
    }


    let profilePhotoCall = await new Promise((resolve, reject) => {
      resolve(this.getProfilePicture(this.urlUserProfile.id));
    }).catch((error) => 'something went wrong')

    this.profileData.profilePictureUrl = profilePhotoCall !== 'something went wrong'? profilePhotoCall: null

    if(this.profileData.profilePictureUrl){
      this.profilePhoto = this.profileData.profilePictureUrl;
    } else {
      this.profilePhoto = false;
    }
    
    setTimeout(() => {
      loading.dismiss();
    }, 2000)

  }

  async updateProfile(){
    const modal = await this.modalController.create({
      component: UpdateProfileModalPage
    })
    return await modal.present();
  }

  async getProfilePicture(profileID){
    let url = await (await this.api.GetProfilePictureProfileID(profileID)).imageurl
    return await this.mediaService.getPhotoUrl(url)
  }

  async sortByDate(array){
    return await array.sort((a, b) => b.time_posted - a.time_posted);
  }


  async openMenu(){
    const modal = await this.modalController.create({
      component: ProfileMenuModalPage
    })
    return await modal.present();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { ModalController } from '@ionic/angular';
import { UpdateProfileModalPage } from 'src/app/modals/update-profile-modal/update-profile-modal.page';
import { ProfileMediaClickPage } from '../../modals/profile-media-click/profile-media-click.page';
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
  videosPostedCount: number;
  profileData: any = {};
  profileMediaData: Array<any> = new Array();
  noPhotosYet;
  noVideosYet;
  browser;

  videosClicked = false;
  photosClicked = true;

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

    this.browser = localStorage.getItem('User-browser')
    
    // grab the username from the url
    this.activatedRoute.params.subscribe((params) => this.urlUser = params['username']);

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
    this.userData = await this.api.getUserProfileMediaData(this.urlUserProfile.id).then(data => data);

    // find number of photos posted by zach or katie
    this.photosPostedCount = this.userData[1];
    this.videosPostedCount = this.userData[3];
  
    if(this.photosPostedCount == 0){
      this.noPhotosYet = true;
    } else {
      this.noPhotosYet = false;
    }

    if(this.videosPostedCount == 0){
      this.noVideosYet = true;
    } else {
      this.noVideosYet = false;
    }


    if(this.userData){
      // sort photos by time posted
      this.userData[0] = await this.sortByDate(this.userData[0]);

      console.log(this.userData)
  
      // get actual photo url from storage
      // userData[0] = await this.mediaService.getPhotoUrlsKey(userData[0])
  
      // save profile data to object to render
      this.profileMediaData = this.userData[0];
      this.profileData.username = await this.api.GetUsernameFromProfileId(this.profileData.id).then(async username => username);
    }


    // let profilePhotoCall = await new Promise((resolve, reject) => {
    //   resolve(this.getProfilePicture(this.urlUserProfile.id));
    // }).catch((error) => 'something went wrong')

    // this.profileData.profilePictureUrl = profilePhotoCall !== 'something went wrong'? profilePhotoCall: null

    if(this.profileData.profilepictureID){
      this.profilePhoto = this.profileData.profilepicture.imageurl;
    } else {
      this.profilePhoto = false;
    }
    
    setTimeout(() => {
      loading.dismiss();
    }, 2000)

  }

  async openClickModal(id){
    const modal = await this.modalController.create({
      component: ProfileMediaClickPage,
      componentProps: {
        mediaId: id
      }
    })
    return await modal.present();
  }

  buttonClicked(event){
    if(event.detail.value === 'video-uploads'){
      this.videosClicked = true;
      this.photosClicked = false;
      this.profileMediaData = this.userData[2]
      console.log(this.profileMediaData)
    } else {
      this.photosClicked = true;
      this.videosClicked = false;
      this.profileMediaData = this.userData[0]
    }
  }

  async updateProfile(){
    const modal = await this.modalController.create({
      component: UpdateProfileModalPage,
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

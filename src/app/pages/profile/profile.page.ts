import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { CachingService } from 'src/app/services/caching.service';
import { ModalController } from '@ionic/angular';
import { UpdateProfileModalPage } from 'src/app/modals/update-profile-modal/update-profile-modal.page';
import { ProfileMediaClickPage } from '../../modals/profile-media-click/profile-media-click.page';
import { MediaService } from 'src/app/services/media.service';
import { LoadingController } from '@ionic/angular';
import { ProfileMenuModalPage } from 'src/app/modals/profile-menu-modal/profile-menu-modal.page';
import { Storage } from 'aws-amplify';
import { finalize } from 'rxjs';

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
  loaded: boolean;
  useCache: boolean;
  button_actions: string = "photos"
  select_buttons: string = "photo-uploads";
  photosPostedCount: number;
  videosPostedCount: number;
  profileData: any = {};
  profilePictureUrl: any;
  profileMediaData: Array<any> = new Array();
  profileImageData: Array<any> = new Array();
  noPhotosYet;
  noVideosYet;
  browser;
  admin;

  videosClicked = false;
  photosClicked = true;

  constructor(
    private api: APIService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private mediaService: MediaService,
    public loadingController: LoadingController,
    private cf: ChangeDetectorRef,
    private cachingService: CachingService
  ) {}

  async ngOnInit() {

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();
    this.loaded = false;

    this.browser = localStorage.getItem('User-browser')

    
    // grab the username from the url
    this.activatedRoute.params.subscribe((params) => this.urlUser = params['username'].toLowerCase());
    
    let profileID = await this.api.GetUsernameProfile(this.urlUser)
    let profile = await this.api.GetProfile(profileID);
    this.profileData = profile;
    this.profileData.username = localStorage.getItem('username');
    let mediaCountCheck = await this.mediaService.getUserProfileMediaCount(this.profileData.id)
    let cachedUrl = 'profile-data-' + this.profileData.id + '?={0,n}'
    let cachedData = await this.cachingService.getCachedRequest(cachedUrl);
    this.profilePictureUrl = await this.api.GetProfilePictureProfileID(this.profileData.id)

    if (this.profileData.profilepictureID) {
      this.profilePhoto = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + this.profilePictureUrl.imageurl;
    } else {
      this.profilePhoto = false;
    }

    if(this.profileData.relation === 'App Creator'){
      this.admin = true;
    } else {
      this.admin = false;
    }


    // get the url username profile data
    this.urlUserProfile = profile;

    // get current user information
    let currentUserUsername = await localStorage.getItem('username');

    // add edit profile button if on personal profile
    if(this.urlUser === currentUserUsername) {
      this.editAccess = true;
    }

    if (cachedData) {
      if (cachedData[1] + cachedData[3] === mediaCountCheck.length) {
        this.useCache = true;
      } else {
        this.useCache = false;
      }
    }

    this.mediaService.getProfileData(this.urlUserProfile.id, this.useCache).pipe(
      finalize(() => {
        loading.dismiss();
        this.loaded = true;
      })
    ).subscribe(res => {
      this.userData = res;

      // find number of photos posted by zach or katie
      this.photosPostedCount = this.userData[1];
      this.videosPostedCount = this.userData[3];

      if (this.photosPostedCount == 0) {
        this.noPhotosYet = true;
      } else {
        this.noPhotosYet = false;
      }

      if (this.videosPostedCount == 0) {
        this.noVideosYet = true;
      } else {
        this.noVideosYet = false;
      }
      // sort photos by time posted
      this.userData[0] = this.sortByDate(this.userData[0]);
      this.userData[2] = this.sortByDate(this.userData[2]);

      // save profile data to object to render
      this.profileImageData = this.userData[0];
      this.profileMediaData = this.userData[2];
    }) 
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
    } else {
      this.photosClicked = true;
      this.videosClicked = false;
    }
  }

  async updateProfile(){
    const modal = await this.modalController.create({
      component: UpdateProfileModalPage,
      componentProps: {
        profile: this.profileData
      }
    })
    return await modal.present();
  }


  sortByDate(array){
    return array.sort((a, b) => Date.parse(b.time_posted) - Date.parse(a.time_posted));
  }

  async getProfilePicture(profileID) {
    return await (await this.api.GetProfilePictureProfileID(profileID))?.imageurl;
  }


  async openMenu(){
    const modal = await this.modalController.create({
      component: ProfileMenuModalPage
    })
    return await modal.present();
  }
}

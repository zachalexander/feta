import { Component, ViewChild, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@aws-amplify/storage';
import { APIService } from 'src/app/API.service';
import { MediaService } from 'src/app/services/media.service';
import { switchMap } from 'rxjs/operators';
import { create } from 'domain';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-profile-picture',
  templateUrl: 'profile-picture.page.html',
  styleUrls: ['profile-picture.page.scss'],
})
export class ProfilePicturePage {
  @ViewChild('cropper') cropper: ImageCropperComponent;
  myImage: any = null;
  croppedImage: any = '';
  transform: ImageTransform = {};
  isMobile = Capacitor.getPlatform() !== 'web';
  selected_image_upload = false;
  profilePic;
  noPicYet = false;
 
  constructor(
    private loadingController: LoadingController, 
    private router: Router, 
    private api: APIService,
    private mediaService: MediaService
    ) {}

  async ngOnInit() {

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });
    await loading.present();

    this.profilePic = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'));


    console.log(this.profilePic)


    if(!this.profilePic){
      this.noPicYet = true;
      loading.dismiss();
    } else {
      this.profilePic = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + this.profilePic.imageurl;
      setTimeout(() => {
        loading.dismiss();
      }, 2000)
    }


  }
 
  async selectImage() {
    this.selected_image_upload = true;
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
 
    this.myImage = `data:image/jpeg;base64,${image.base64String}`;
    this.croppedImage = null;
  }

  // Called when cropper is ready
  imageLoaded(loading) {
    loading.dismiss();
  }
 
  // Called when we finished editing (because autoCrop is set to false)
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.selected_image_upload = false;
  }
 
  // We encountered a problem while loading the image
  loadImageFailed() {
    console.log('Image load failed!');
  }
 
  // Manually trigger the crop
  cropImage() {
    this.cropper.crop();
    this.myImage = null;
  }
 
  // Discard all changes
  discardChanges() {
    this.myImage = null;
    this.croppedImage = null;
    this.selected_image_upload = false;
  }
 
  // Edit the image
  rotate() {
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
 
    this.transform = {
      ...this.transform,
      rotate: newValue,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  async continueToSlider(){
    await this.router.navigate(['/profile', localStorage.getItem('username')]).then(() => { window.location.reload()})
  }

  public async submitToS3(filename, blob){
    await Storage.put(filename, blob, {contentType: "image/jpeg", contentEncoding: 'base64'})
  }

  async saveToS3(){

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    const blob = await fetch(this.croppedImage).then(res => res.blob())
    const username = await localStorage.getItem('username')
    const filename = 'profile-pictures/' + localStorage.getItem('profileID') + '&' + Math.random().toString(36).slice(2, 7) + '.jpg'
    const imagekitFilename = localStorage.getItem('profileID') + '&' + Math.random().toString(36).slice(2, 7) + '.jpg'

    try {
      let profileID = localStorage.getItem('profileID')
      let profilepictureID = await (await this.api.GetProfile(profileID)).profilepictureID

      console.log(profilepictureID)

      if(!profilepictureID){

          await this.submitToS3(filename, blob)

          const createProfilePicture = new Promise(resolve => {
            resolve(this.api.CreateProfilePicture({
              imageurl: imagekitFilename,
              profileID: profileID
            }))
          })
          
          const findNewProfilePictureID = await new Promise(resolve => createProfilePicture.then(async () => {
            resolve(await(await this.api.GetProfilePictureProfileID(profileID)).id)
          }))

          profilepictureID = findNewProfilePictureID.toString();
          
          const updateProfile = new Promise(resolve => {
            resolve(this.api.UpdateProfile({id: profileID, profilepictureID: profilepictureID}))
          })

          updateProfile.then(() => {
            this.router.navigate(['/profile/', username]).then(() => { window.location.reload()})
            loading.dismiss();
          })


          return true;

        } else {

          const uploadToS3 = new Promise(resolve => {
             resolve(this.submitToS3('profile-pictures/' + imagekitFilename, blob))
          })

          uploadToS3.then(async () => {
            await this.api.UpdateProfilePicture({id: profilepictureID, imageurl: imagekitFilename })
            this.router.navigate(['/profile/', username]).then(() => { window.location.reload()})
            loading.dismiss();
          })


          return true;
        }
    } catch(error) {
      console.log('error occurred saving to database: ', error)
      return false;
    }
  }

  async getProfilePicture(profileID){
    return await (await this.api.GetProfilePictureProfileID(profileID))?.imageurl;
  }
}

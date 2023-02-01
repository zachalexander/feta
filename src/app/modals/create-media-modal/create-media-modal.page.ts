import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from "../../API.service";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { PassThrough } from 'stream';
import { Capacitor } from '@capacitor/core';
import { CachingService } from 'src/app/services/caching.service';

const APP_DIRECTORY = Directory.Documents

@Component({
  selector: 'app-create-media-modal',
  templateUrl: './create-media-modal.page.html',
  styleUrls: ['./create-media-modal.page.scss'],
})
export class CreateMediaModalPage {

  src: any;
  email: any;
  fullName: any;
  userName: any;
  id: any;
  profileID: any;
  usernameID: any;
  postImageForm = {} as FormGroup;
  folderContent = [];
  currentFolder = '';
  path;
  file_name;
  blob;
  isImage = false;
  encoder: any;
  
  browser: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private api: APIService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private loadingController: LoadingController,
    private cachingService: CachingService
  ) {    
    this.postImageForm = new FormGroup({
    description: new FormControl('')
    });

  }

  get f(){
    return this.postImageForm.controls;
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    this.browser = localStorage.getItem('User-browser')
    let profile = await this.api.GetProfile(localStorage.getItem('profileID'));

    this.profileID = profile.id;
    this.usernameID = profile.usernameID;

    await this.loadMediaFromStorage().then(() => loading.dismiss())

    
  }

  async loadMediaFromStorage() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    const file = await Filesystem.readFile({
      directory: APP_DIRECTORY,
      path: this.path
    })

    this.blob = this.b64toBlob(file.data)

    if(this.path.substring(this.path.length - 3) === 'mp4' ||
      this.path.substring(this.path.length - 3) === 'mov' ||
      this.path.substring(this.path.length - 3) === 'ogg' ||
      this.path.substring(this.path.length - 3) === 'ebM'){

        if (Capacitor.getPlatform() === "web"){
    
          let blobUrl = URL.createObjectURL(this.blob) as any;
          blobUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl)
          this.src = blobUrl;
          loading.dismiss();
    
        } else {
    
          const file_uri = await Filesystem.getUri({
            path: this.path,
            directory: APP_DIRECTORY
          })
    
          this.src = this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(file_uri.uri));
          loading.dismiss();
        }
      } else {
        this.isImage = true;

        if (Capacitor.getPlatform() === "web") {

          let blobUrl = URL.createObjectURL(this.blob) as any;
          blobUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl)
          this.src = blobUrl;
          loading.dismiss();

        } else {

          const file_uri = await Filesystem.getUri({
            path: this.path,
            directory: APP_DIRECTORY
          })

          this.src = this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(file_uri.uri));
          loading.dismiss();
        }

      }

  }

  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  // async convertUrlToBase64(url) {
  //   const response = await fetch(`${url}`);
  //   const blob = await response.blob();

  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader;
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   })
  // }

  async closeModal(imagepost) {

    let extension = this.file_name.split('.').pop()

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    let usernameID = await (await this.api.GetUsernameDataFromProfileId(this.profileID)).id

    imagepost.description = imagepost.description
    imagepost.time_posted = new Date().toISOString()
    imagepost.usernameID = usernameID
    imagepost.profileID = this.profileID
    
    if(extension === 'mov' || extension === 'mp4' || extension === 'webm' || extension === 'ogg' || extension === 'MOV'){
      const video = true;
      imagepost.s3_key = `video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}/video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.m3u8`
      await this.submitToS3(`video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`, this.blob, video)
    } else {
      const video = false;
      imagepost.s3_key = `https://ik.imagekit.io/bkf4g8lrl/feta-photos/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`
      await this.submitToS3(`timeline-uploads/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`, this.blob, video)
    }
    

    loading.dismiss();

    await this.api.CreateImagePost(imagepost).then(() => {
      this.cachingService.clearAllCachedData();
      this.router.navigate(['/timeline']).then(() => { window.location.reload()});
      loading.dismiss();
    })
    
  }

  backToTimeline(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async submitToS3(filename, blob, isVideo){

    if(isVideo){
      await Storage.put(filename, blob, {
        bucket: "fetadevvodservice-dev-input-nk0sepbg"
      })
    } else {
      await Storage.put(filename, blob, {contentType: "image/jpeg"})
    }
  }


}

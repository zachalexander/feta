import { Component, ComponentFactoryResolver, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { APIService } from "../../API.service";
import { CachingService } from 'src/app/services/caching.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { PassThrough } from 'stream';
import { Capacitor } from '@capacitor/core';

import { ImageResizer, ImageResizerOptions } from '@awesome-cordova-plugins/image-resizer/ngx';
import { VideoEditor } from '@awesome-cordova-plugins/video-editor/ngx';

const APP_DIRECTORY = Directory.Documents;

@Component({
  selector: 'app-create-media-modal',
  templateUrl: './create-media-modal.page.html',
  styleUrls: ['./create-media-modal.page.scss'],
})
export class CreateMediaModalPage {
  @ViewChild('createdVideo', { static: false }) private video: any;
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
  file_name_ext;
  file_name;
  posterImage;
  blob;
  isVideo;
  response;
  isImage = false;
  encoder: any;
  profile: any;
  show: boolean;
  
  browser: any;

  nowPlaying = null;
  videoOver = false;
  muted = true;
  replay = false;
  pause;

  constructor(
    private modalController: ModalController,
    private api: APIService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private cdref: ChangeDetectorRef
  ) {    
    this.postImageForm = new FormGroup({
    description: new FormControl('')
    });

  }

  get f(){
    return this.postImageForm.controls;
  }

  async ngOnInit() {
    this.show = false;
    this.browser = localStorage.getItem('User-browser')
    let profile = this.profile;

    this.profileID = profile.id;
    this.usernameID = profile.usernameID;

    if (this.response === 'success') {
      const alert = await this.alertController.create({
        message: 'Almost there...',
        htmlAttributes: {
          'aria-label': 'alert dialog',
        },
      })

      alert.present();

      setTimeout(() => {
        alert.dismiss()
      }, 10000)

      let response = setTimeout(async () => {
        await this.loadMediaFromStorage().then((data) => {
          this.show = true;
          this.src = data[0];
          this.posterImage = data[1];
        });
      }, 10000)

      // if (response) {
      //   this.show = true;
      //   this.src = response[0]
      //   this.posterImage = response[1]
      // }
    } else {
      this.alertController.create({
        message: 'This is an alert with custom aria attributes.',
        htmlAttributes: {
          'aria-label': 'alert dialog',
        },
      })
    }
  }

  async ngAfterViewInit(){
    setTimeout(() => {
      if (this.video) {
        console.log(this.video)
        const nativeElement = this.video.nativeElement;
        this.nowPlaying = nativeElement;
        this.nowPlaying.muted = true;
        let playPromise = this.nowPlaying.pause();
  
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            this.nowPlaying.play();
          })
            .catch(error => {
              this.nowPlaying.play();
              console.log(error)
            })
        }
        this.pause = true;
        this.muted = true;
        this.replay = false;
        this.videoOver = false;
        this.cdref.detectChanges();
      }
    }, 10000)
  }

  async loadMediaFromStorage() {
    const file = await Filesystem.readFile({
      directory: APP_DIRECTORY,
      path: this.path
    })

    this.blob = this.b64toBlob(file.data)

    if(this.isVideo){
      this.isImage = false;
      let extension = `${this.file_name}/${this.file_name}.m3u8`
      let posterExtension = `poster-images/${this.file_name}Poster-Images.0000000.jpg`;

      if (Capacitor.getPlatform() === "web"){
          this.src = "https://d2glij88atjbas.cloudfront.net/public/" + extension;
          this.posterImage = `https://ik.imagekit.io/bkf4g8lrl/${posterExtension}`
          return [this.src, this.posterImage];
      } else {
        const file_uri = await Filesystem.getUri({
          path: this.path,
          directory: APP_DIRECTORY
        })
        this.src = this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(file_uri.uri));
        this.posterImage = `https://ik.imagekit.io/bkf4g8lrl/${posterExtension}`
        console.log(this.src, this.posterImage)
        return [this.src, this.posterImage];
      }
    } else {
      this.isImage = true;

      if (Capacitor.getPlatform() === "web") {
        let blobUrl = URL.createObjectURL(this.blob) as any;
        blobUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl)
        this.src = blobUrl;
        return this.src;
      } else {
        const file_uri = await Filesystem.getUri({
          path: this.path,
          directory: APP_DIRECTORY
        })
        this.src = this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(file_uri.uri));
        return this.src;
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

  async closeModal(imagepost) {

    let extension = this.file_name_ext.split('.').pop()
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

    let usernameID = localStorage.getItem('usernameID');

    imagepost.description = imagepost.description;
    imagepost.time_posted = new Date().toISOString();
    imagepost.usernameID = usernameID;
    imagepost.profileID = this.profileID;
    imagepost.sorterValue = "media"
    
    if(extension === 'mov' || extension === 'mp4' || extension === 'webm' || extension === 'ogg' || extension === 'MOV'){
      const video = true;
      imagepost.s3_key = `video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}/video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.m3u8`
      imagepost.downloadableVideo = `video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`
      imagepost.posterImage = this.posterImage
      await this.submitToS3(`video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`, this.blob, video, extension)
    } else {
      const video = false;
      imagepost.mediaSourceMobile = `https://ik.imagekit.io/bkf4g8lrl/feta-photos/tr:f-jpg/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`
      imagepost.mediaSourceDesktop = `https://ik.imagekit.io/bkf4g8lrl/feta-photos/tr:f-auto/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`
      imagepost.s3_key = `timeline-uploads/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`
      await this.submitToS3(`timeline-uploads/photos/photo_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}.${extension.toLowerCase()}`, this.blob, video, extension)
    }
    
    loading.dismiss();

    await this.api.CreateImagePost(imagepost).then(() => {
      this.router.navigate(['/timeline']).then(() => { window.location.reload()});
      loading.dismiss();
    })
    
  }

  backToTimeline(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async submitToS3(filename, blob, isVideo, extension){
    if(isVideo){
      await Storage.put(filename, blob, {
        contentType: "video/" + extension,
        bucket: "fetadevvodservice-dev-input-nk0sepbg"
      })
    } else {
      await Storage.put(filename, blob, {contentType: "image/jpeg"})
    }
  }

  videoEnd() {
    this.replay = true;
    this.pause = true;
  }

  replayVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.play();
      this.nowPlaying.muted = false;
      this.muted = false;
      this.replay = false;
      this.pause = false;
    }
  }

  pauseVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.pause();
      this.nowPlaying.muted = true;
      this.replay = false;
      this.muted = true;
      this.pause = true;
    }
  }

  playVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.nowPlaying.play();
      this.replay = false;
      this.muted = false;
      this.pause = false;
    }
  }

  unmuteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.muted = false;
    }
  }

  muteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = true;
      this.muted = true;
    }
  }


}

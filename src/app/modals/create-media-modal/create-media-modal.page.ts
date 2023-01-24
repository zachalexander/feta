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
  blob;

  browser: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private api: APIService,
    private router: Router,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    private loadingController: LoadingController
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

    let profile = await this.api.GetProfile(localStorage.getItem('profileID'));

    this.profileID = profile.id;
    this.usernameID = profile.usernameID;

    await this.addPhotoToGallery().then(() => loading.dismiss())

    this.browser = localStorage.getItem('User-browser')
    console.log(this.browser)
    
  }

  async addPhotoToGallery() {
    // const loading = await this.loadingController.create({
    //   spinner: 'lines-sharp-small',
    //   translucent: false,
    //   cssClass: 'spinner-loading'
    // });

    // loading.present();

    // let file = await this.loadDocuments();

    if (Capacitor.getPlatform() === "web"){
      const file = await Filesystem.readFile({
        directory: APP_DIRECTORY,
        path: this.path
      })

      this.blob = this.b64toBlob(file.data)
      let blobUrl = URL.createObjectURL(this.blob) as any;
      blobUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl + "#t=0.5")
      this.src = blobUrl;
      console.log(this.src)

    } else {
      Filesystem.getUri({
        path: this.path,
        directory: APP_DIRECTORY
      }).then(function({uri}){
        this.src = Capacitor.convertFileSrc(uri)
      })
    }

    // this.src = 
    // let image = this.sanitizer.bypassSecurityTrustUrl(file)
    // this.src = image;
    // loading.dismiss();
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

  async convertUrlToBase64(url) {
    const response = await fetch(`${url}`);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
  }

  async closeModal(imagepost) {

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
    imagepost.s3_key = localStorage.getItem('filename-string')

    // const blob = await fetch(localStorage.getItem('blob-string')).then(r => r.blob())

    await this.submitToS3('zach-uploads/zach_upload_test.mov', this.blob)

    loading.dismiss();

    // await this.api.CreateImagePost(imagepost).then((postImage) => {
    //   // this.cachingService.clearAllCachedData();
    //   this.router.navigate(['/timeline']).then(() => { window.location.reload()});
    //   loading.dismiss();
    // })
    
  }

  backToWall(){
    this.loadingController.dismiss();
  }

  async submitToS3(filename, blob){
    await Storage.put(filename, blob)
  }


}

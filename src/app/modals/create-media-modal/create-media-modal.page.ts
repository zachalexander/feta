import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from "../../API.service";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@aws-amplify/storage';

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
    }
  );
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
  }

  async addPhotoToGallery() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();
    let src = localStorage.getItem('blob-string')
    let image = this.sanitizer.bypassSecurityTrustUrl(src)
    this.src = image;
    loading.dismiss();
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

    const blob = await fetch(localStorage.getItem('blob-string')).then(r => r.blob())

    await this.submitToS3(localStorage.getItem('filename-string'), blob)

    await this.api.CreateImagePost(imagepost).then((postImage) => {
      // this.cachingService.clearAllCachedData();
      this.router.navigate(['/timeline']).then(() => { window.location.reload()});
      loading.dismiss();
    })
    
  }

  backToWall(){
    this.loadingController.dismiss();
  }

  async submitToS3(filename, blob){
    await Storage.put(filename, blob, {contentType: "image/jpeg"})
  }


}

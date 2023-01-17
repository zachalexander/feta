import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateMediaModalPage } from '../../modals/create-media-modal/create-media-modal.page';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { APIService } from "../../API.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})

export class AddPhotoComponent implements OnInit {

  submitted = false;
  dataReturned: any;
  src;
  public image: [];

  constructor(
    private router: Router, 
    public mediaService: MediaService,
    public ngZone: NgZone, 
    public api: APIService,
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    public loadingController: LoadingController
    ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateMediaModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  ngOnInit() { 
    this.submitted = false;
  }

  async addPhotoToGallery() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    let status = await this.mediaService.addNewToGallery();

    if(!status['status']){
      this.submitted = false;
    } else {
      this.openModal();
      this.submitted = true;
      loading.dismiss();
    }
  }

  backToTimeline(){
    this.modalController.dismiss();
  }

}

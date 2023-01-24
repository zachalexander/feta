import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo.component';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: 'timeline.page.html',
  styleUrls: ['timeline.page.scss']
})
export class TimelinePage {

  timelineData: any;
  timelineDataLength: any;

  constructor(
    private modalController: ModalController,
    private mediaService: MediaService
  ) {}

  async ngOnInit(){
    let data = await this.getMedia();
    console.log(data[0])
    this.timelineData = data[0];
    this.timelineDataLength = data[1];
  }

  async createPhotoModal(){
    const modal = await this.modalController.create({
      component: AddPhotoComponent
    })
    return await modal.present();
  }

  async getMedia(){
    return this.mediaService.getDataFromGraphQL(localStorage.getItem('usernameID'));
  }
}

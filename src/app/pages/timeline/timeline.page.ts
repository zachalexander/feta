import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo.component';
import { MediaService } from 'src/app/services/media.service';
import { Platform } from '@ionic/angular';
import { APIService } from 'src/app/API.service';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: 'timeline.page.html',
  styleUrls: ['timeline.page.scss']
})
export class TimelinePage implements OnInit {
  
  timelineData: any;
  timelineDataLength: any;
  nextToken: any;
  loaded: any;
  cachedDataAvailable: any;

  constructor(
    private modalController: ModalController,
    private mediaService: MediaService,
    public platform: Platform,
    private api: APIService,
    private cachingService: CachingService
  ) {
    this.timelineData;
    this.timelineDataLength;
  }

  async ngOnInit(){


    // await this.mediaService.callAndCacheImageId(localStorage.getItem('usernameID'))

    await this.mediaService.getTimelineData().pipe(
      finalize(() => {
        this.loaded = true;
      })
    ).subscribe(data => {
      this.timelineData = data[0];
      this.nextToken = data[2];
    })
  }

  async createPhotoModal(){
    const modal = await this.modalController.create({
      component: AddPhotoComponent
    })
    return await modal.present();
  }


  async getMedia(){
    return await this.mediaService.getTimelineData();
  }
}

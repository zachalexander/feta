import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo.component';
import { MediaService } from 'src/app/services/media.service';
import { CachingService } from 'src/app/services/caching.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-timeline-page',
  templateUrl: 'timeline.page.html',
  styleUrls: ['timeline.page.scss']
})
export class TimelinePage implements OnInit {
  
  timelineData: any;
  timelineDataLength: any;
  loaded: any;
  cachedDataAvailable: any;

  constructor(
    private modalController: ModalController,
    private mediaService: MediaService,
    public cachingService: CachingService,
    public platform: Platform
  ) {
    this.timelineData;
    this.timelineDataLength;
  }

  async ngOnInit(){

    const cachedData = await this.cachingService.getCachedRequest("family-timeline?={0,n}")
    console.log('cached data: ', cachedData)

    console.log(await this.platform.platforms())

    if (!cachedData) {
      this.cachedDataAvailable = false;
      await this.mediaService.getTimelineData().pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe(data => {
        this.timelineData = data[0];
        this.timelineDataLength = data[0].length;
      })
    } else {
      this.cachedDataAvailable = true;
      this.timelineData = cachedData[0]
      this.timelineDataLength = cachedData[1]
      this.loaded = true;
    }
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

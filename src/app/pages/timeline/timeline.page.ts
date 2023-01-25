import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/internal/operators/finalize';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo.component';
import { MediaService } from 'src/app/services/media.service';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: 'timeline.page.html',
  styleUrls: ['timeline.page.scss']
})
export class TimelinePage implements OnInit {

  // data: any[] = [
  //   {
  //     "mediaSource": "../../assets/newmexico.MOV",
  //     "isVideo": true,
  //     "time_posted": "2023-01-25T15:19:28.651Z",
  //     "usernameID": "3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed",
  //     "description": "Fun in New Mexico.",
  //     "id": "8c252cdf-5a60-4e8b-9ea6-0801636c1c2f",
  //     "likes": "{\"usernames\":[\"b8287214-8f35-4c4c-bc75-90ffdd989e76\"]}",
  //     "like_count": 1586,
  //     "username": "katie",
  //     "userLiked": true,
  //     "profilePicture": "../../assets/avatar.svg"
  //   },
  //   {
  //     "mediaSource": "../../assets/christmas1.MOV",
  //     "isVideo": true,
  //     "time_posted": "2023-01-25T15:19:28.651Z",
  //     "usernameID": "3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed",
  //     "description": "Tradition.",
  //     "id": "8c252cdf-5a60-4e8b-9ea6-0801636c1c2f",
  //     "likes": "{\"usernames\":[\"b8287214-8f35-4c4c-bc75-90ffdd989e76\"]}",
  //     "like_count": 1586,
  //     "username": "katie",
  //     "userLiked": true,
  //     "profilePicture": "../../assets/avatar.svg"
  //   },
  //   {
  //     "mediaSource": "../../assets/ruggles-snooze.MOV",
  //     "isVideo": true,
  //     "time_posted": "2023-01-25T02:19:32.063Z",
  //     "usernameID": "b8287214-8f35-4c4c-bc75-90ffdd989e76",
  //     "description": "",
  //     "id": "256b0cc4-9e74-4989-9737-d6797b6d7eb2",
  //     "likes": "{\"usernames\":[\"3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed\"]}",
  //     "like_count": 123,
  //     "username": "zach",
  //     "userLiked": false,
  //     "profilePicture": "../../assets/avatar.svg"
  //   },
  //   {
  //     "mediaSource": "../../assets/ruggles-snooze2.mov",
  //     "isVideo": true,
  //     "time_posted": "2023-01-24T22:25:47.253Z",
  //     "usernameID": "b8287214-8f35-4c4c-bc75-90ffdd989e76",
  //     "description": "The living room during the holidays, 2022.",
  //     "id": "c0642d81-fc3b-468d-b43d-7a4e9541abc7",
  //     "likes": "{\"usernames\":[\"b8287214-8f35-4c4c-bc75-90ffdd989e76\",\"3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed\"]}",
  //     "like_count": 12,
  //     "username": "zach",
  //     "userLiked": true,
  //     "profilePicture": "../../assets/avatar.svg"
  //   },
  //   {
  //     "mediaSource": "../../assets/snow.mov",
  //     "isVideo": true,
  //     "time_posted": "2023-01-24T21:59:40.176Z",
  //     "usernameID": "3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed",
  //     "description": "Snoozing with Rugs ♥️",
  //     "id": "bb99893b-ce0d-4339-a537-cf5a7e55eec2",
  //     "likes": "{\"usernames\":[\"3f91b6e5-1c12-4e17-8cc7-6dd66c26d7ed\",\"b8287214-8f35-4c4c-bc75-90ffdd989e76\"]}",
  //     "like_count": 200,
  //     "username": "katie",
  //     "userLiked": true,
  //     "profilePicture": "../../assets/avatar.svg"
  //   }
  // ]

  timelineData: any;
  timelineDataLength: any;
  loaded: any;
  cachedDataAvailable: any;

  constructor(
    private modalController: ModalController,
    private mediaService: MediaService,
    public cachingService: CachingService
  ) {
    this.timelineData;
    this.timelineDataLength;
    console.log(this.timelineData)
  }

  async ngOnInit(){

    const cachedData = await this.cachingService.getCachedRequest("family-timeline?={0,n}")
    console.log('cached data: ', cachedData)

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

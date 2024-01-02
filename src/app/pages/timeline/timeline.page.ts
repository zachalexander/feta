import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MediaService } from 'src/app/services/media.service';
import { Platform } from '@ionic/angular';
import { APIService } from 'src/app/API.service';
import { CachingService } from 'src/app/services/caching.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { CreateMediaModalPage } from 'src/app/modals/create-media-modal/create-media-modal.page';

const APP_DIRECTORY = Directory.Documents

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
  addMediaClick: boolean;
  @ViewChild('filepicker') picker: ElementRef;
  currentFolder = 'feta';
  mediaSubmitted: any;
  selected: any;
  dataReturned: any;

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

    this.addMediaClick = false;
    this.mediaSubmitted = false;

    // await this.mediaService.getTimelineData().pipe(
    //   finalize(() => {
    //     this.loaded = true;
    //   })
    // ).subscribe(data => {
    //   this.timelineData = data[0];
    //   this.nextToken = data[2];
    // })
  }

  async fileSelected(event){

    this.selected = event.target.files[0];

    await write_blob({
      directory: APP_DIRECTORY,
      path: `${this.currentFolder}/${this.selected.name}`,
      blob: this.selected,
      recursive: true,
      on_fallback(error) {
        console.log('error: ', error)
      }
    })

    this.mediaReadyToSubmit();
  }

  addFile() {
    this.picker.nativeElement.click();
  }

  mediaReadyToSubmit(){
    const status = { status: true }
    if (!status['status']) {
      this.mediaSubmitted = false;
    } else {
      this.openCreateMediaModal();
      this.mediaSubmitted = true;
    }
  }

  async openCreateMediaModal() {
    const modal = await this.modalController.create({
      component: CreateMediaModalPage,
      componentProps: {
        "path": `${this.currentFolder}/${this.selected.name}`,
        "file_name": `${this.selected.name}`
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }


  async getMedia(){
    return await this.mediaService.getTimelineData();
  }
}

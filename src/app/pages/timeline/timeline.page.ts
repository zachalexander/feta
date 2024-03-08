import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FA, ModelSortDirection } from 'src/app/FA.service';
import { Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { CreateMediaModalPage } from 'src/app/modals/create-media-modal/create-media-modal.page';
import { Storage } from 'aws-amplify';
import { catchError } from 'rxjs';

const APP_DIRECTORY = Directory.Documents;

@Component({
  selector: 'app-timeline-page',
  templateUrl: 'timeline.page.html',
  styleUrls: ['timeline.page.scss']
})
export class TimelinePage implements OnInit {
  
  @ViewChild('filepicker') picker: ElementRef;
  currentFolder = 'feta';
  timelineData: any;
  timelineDataLength: any;
  nextToken: any;
  loaded: any;
  mediaSubmitted: any;
  selected: any;
  dataReturned: any;
  profile: any;
  addMediaClick: boolean;

  constructor(
    private modalController: ModalController,
    public platform: Platform,
    private fa: FA,
    private loadingController: LoadingController
  ) {
    this.timelineData;
    this.timelineDataLength;
  }

  async ngOnInit(){

    // ensures that the option to add media is not active on load
    this.addMediaClick = false;
    this.mediaSubmitted = false;

    // getting profile data of user
    this.profile = await this.fa.GetProfile(localStorage.getItem('profileID'))

    // pulling most recent media for timeline
    await this.fa.ImagePostsBySorterValueAndTime_posted("media", null, ModelSortDirection.DESC, null, 4).then(data => {
      this.timelineData = data.items;
      this.nextToken = data.nextToken;
      this.loaded = true;
      console.log(this.timelineData)
    })
  }


  // functions to add media to timeline
  async fileSelected(event){

    this.selected = event.target.files[0];

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    await write_blob({
      directory: APP_DIRECTORY,
      path: `${this.currentFolder}/${this.selected.name}`,
      blob: this.selected,
      recursive: true,
      on_fallback(error) {
        console.log('error: ', error)
      }
    })

    loading.dismiss();
    this.mediaReadyToSubmit();
  }

  addFile() {
    this.picker.nativeElement.click();
  }

  mediaReadyToSubmit(){
    const status = { status: true }
    console.log(status)
    if (!status['status']) {
      this.mediaSubmitted = false;
    } else {
      this.openCreateMediaModal();
      this.mediaSubmitted = true;
    }
  }


  async submitToS3(filename, blob, isVideo, extension) {
    if (isVideo) {
      let response = await Storage.put(filename, blob, {
        contentType: "video/" + extension,
        bucket: "fetadevvodservice-dev-input-nk0sepbg"
      }).then(() => {
        return 'success'
      }, catchError => {
        return catchError;
      })
      return response;
    } else {
      let response = await Storage.put(filename, blob, { contentType: "image/jpeg" }).then(() => {
        return 'success'
      }, catchError => {
        return catchError;
      })
      return response;
    }


  }

  async openCreateMediaModal() {

    let extension = this.selected.name.split('.').pop();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    let filename_ext = `video_upload_${month}_${day}_${year}_${hour}_${mins}_${secs}` + `.${extension}`
    let filename = filename_ext.split('.').slice(0, -1).join('.')

    let response = await this.submitToS3(filename_ext, this.selected, true, extension).then((response) => response)

    const modal = await this.modalController.create({
      component: CreateMediaModalPage,
      componentProps: {
        "path": `${this.currentFolder}/${this.selected.name}`,
        "file_name_ext": filename_ext,
        "file_name": filename,
        "profile": this.profile,
        "isVideo": true,
        "response": response
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

}

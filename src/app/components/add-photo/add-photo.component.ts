import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateMediaModalPage } from '../../modals/create-media-modal/create-media-modal.page';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { APIService } from "../../API.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Filesystem, Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';


const APP_DIRECTORY = Directory.Documents

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})

export class AddPhotoComponent implements OnInit {

  submitted = false;
  dataReturned: any;
  src;
  blob;
  filename;
  selected;
  public image: [];

  folderContent = [];
  currentFolder = 'FETA';
  copyFile = null;
  @ViewChild('filepicker') picker: ElementRef;

  constructor(
    private router: Router, 
    public mediaService: MediaService,
    public ngZone: NgZone, 
    public api: APIService,
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private previewAnyFile: PreviewAnyFile
    ) { }

  async openModal() {
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



  addFile(){
    // this.deleteFiles();
    this.picker.nativeElement.click();
  }

  async deleteFiles() {
    await Filesystem.rmdir({
      directory: APP_DIRECTORY,
      path: this.currentFolder,
      recursive: true
    });
  }

  async fileSelected($event){
    this.selected = $event.target.files[0];

    // const savePhotoBase64 = await fetch(selected)
    // this.blob = await savePhotoBase64.blob()
    // console.log(this.blob)
    // this.filename = 'zach-uploads/zach_upload_' + new Date().toJSON() + '.mov'

    // localStorage.setItem('blob-string', URL.createObjectURL(this.blob))
    // localStorage.setItem('filename-string', this.filename)

    console.log(this.selected)
  

    await write_blob({
      directory: APP_DIRECTORY,
      path: `${this.currentFolder}/${this.selected.name}`,
      blob: this.selected,
      recursive: true,
      on_fallback(error) {
        console.log('error: ', error)
      }
    })


    // this.loadDocuments();
    this.addPhotoToGallery();
  }

  ngOnInit() { 
    this.submitted = false;
  }

  async addPhotoToGallery() {
    // const loading = await this.loadingController.create({
    //   spinner: 'lines-sharp-small',
    //   translucent: false,
    //   cssClass: 'spinner-loading'
    // });

    const status = { status: true}

    // loading.present();

    // let status = await this.mediaService.addNewToGallery();

    if(!status['status']){
      this.submitted = false;
    } else {
      this.openModal();
      this.submitted = true;
      // loading.dismiss();
    }
  }

  backToTimeline(){
    this.modalController.dismiss();
  }

}

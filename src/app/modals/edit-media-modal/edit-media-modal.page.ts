import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FA } from 'src/app/FA.service';

@Component({
  selector: 'app-edit-media-modal',
  templateUrl: './edit-media-modal.page.html',
  styleUrls: ['./edit-media-modal.page.scss'],
})
export class EditMediaModalPage  {
  
  constructor(
    private cdref: ChangeDetectorRef,
    private fa: FA,
    private modalController: ModalController
    ) { 
      this.updateMediaForm = new FormGroup({
        description: new FormControl('')
      })
    }
    
  @ViewChild('editableVideo', {static: false}) private video: any;
  @ViewChild('updateMediaInput') updateMediaInput: IonTextarea;
  updateMediaForm = {} as FormGroup;
  mediaData: any;
  videoLink: any;
  posterImage: any;
  videoContent: boolean;

  nowPlaying = null;
  videoOver = false;
  muted = true;
  replay = false;
  pause;

  async addDescription() {
    this.updateMediaForm.controls['description'].setValue(this.mediaData[0].description);
  }

  ngOnInit() {
    if(!this.mediaData[0].mediaSourceDesktop && !this.mediaData[0].mediaSourceMobile){
      this.videoContent = true;
      this.videoLink = this.mediaData[1].videoContent;
      this.addDescription();

    } else {
      this.videoContent = false;
      this.addDescription();
    }
  }


  ngAfterViewInit(){
    if(this.video){
      const nativeElement = this.video.nativeElement;
      this.nowPlaying = nativeElement;
      this.nowPlaying.muted = true;
      let playPromise = this.nowPlaying.pause();
  
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            this.nowPlaying.play();
          })
            .catch(error => {
              this.nowPlaying.play();
              console.log(error)
            })
        }
      this.pause = true;
      this.muted = true;
      this.replay = false;
      this.videoOver = false;
      this.cdref.detectChanges();
    }
  }

  videoEnd() {
    this.replay = true;
    this.pause = true;
  }

  replayVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.play();
      this.nowPlaying.muted = false;
      this.muted = false;
      this.replay = false;
      this.pause = false;
    }
  }

  pauseVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.pause();
      this.nowPlaying.muted = true;
      this.replay = false;
      this.muted = true;
      this.pause = true;
    }
  }

  playVideo() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.nowPlaying.play();
      this.replay = false;
      this.muted = false;
      this.pause = false;
    }
  }

  unmuteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = false;
      this.muted = false;
    }
  }

  muteClicked() {
    if (this.nowPlaying) {
      this.nowPlaying.muted = true;
      this.muted = true;
    }
  }

  postDescription(input){

    let description = input.description;

    this.fa.UpdateImagePost({id: this.mediaData[0].id, description: description}).then(() => {
      this.backToTimeline();
    })
  }

  async backToTimeline() {
    this.modalController.dismiss({
      'dismissed': true,
      'formStatus': 'markAsUntouched',
      'noInput': true
    });
  }

}

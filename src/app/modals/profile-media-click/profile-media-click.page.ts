import { APIService } from '../../API.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-media-click',
  templateUrl: './profile-media-click.page.html',
  styleUrls: ['./profile-media-click.page.scss'],
})
export class ProfileMediaClickPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private api: APIService
  ) { }

  mediaId;
  timelineData: any;
  timelineDataLength: any;

  async ngOnInit() {
    let data = await this.api.getSpecificTimelineMedia(this.mediaId)
    this.timelineData = [data[1]];
    this.timelineDataLength = data[0]
  }

  
  backToProfile(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

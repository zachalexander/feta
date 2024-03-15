import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { APIService } from '../../API.service';
import { FA } from 'src/app/FA.service';
import { MediaService } from 'src/app/services/media.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { ModalController, Platform, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-like-button',
  templateUrl: './timeline-like-button.component.html',
  styleUrls: ['./timeline-like-button.component.scss'],
})


export class TimelineLikeButtonComponent {

  @Input() alreadyLiked: boolean;
  @Input() imageId: string;
  @Output() liked: EventEmitter<boolean> = new EventEmitter();
  onUpdateImageLikeSubscription: Subscription | null = null;
  likeclicked;
  onCreateLikesSubscription: Subscription | null = null;

  constructor(
    public api: APIService,
    public mediaService: MediaService,
    public platform: Platform,
    public fa: FA
  ) { }

  async likeEvent(id){
    if(this.platform.is('hybrid')){
      await Haptics.impact({ style: ImpactStyle.Heavy})
    }

    this.likeclicked = true;
    let userData: any = await this.api.ListLikes({and: [{imagePostsID: { eq: id }, usernameID: {eq: localStorage.getItem('usernameID')}}]}).then((data) => data);
    let userLiked = userData.items.length;

    if(userLiked > 0){
      let likeID = userData.items[0].id;
      await this.api.DeleteLikes({ id: likeID }).then(() => {
        this.alreadyLiked = !this.alreadyLiked;
        this.liked.emit(!this.alreadyLiked)
        this.likeclicked = false;
      })
    } else {
      await this.api.CreateLikes({ "usernameID": localStorage.getItem('usernameID'), "profileID": localStorage.getItem('profileID'), "imagePostsID": id }).then(() => {
        this.alreadyLiked = !this.alreadyLiked;
        this.liked.emit(this.alreadyLiked)
        this.likeclicked = false;
      })
    }
  }


}

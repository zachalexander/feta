import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { APIService } from '../../API_backup_sept14.service';
import { MediaService } from 'src/app/services/media.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-like-button',
  templateUrl: './timeline-like-button.component.html',
  styleUrls: ['./timeline-like-button.component.scss'],
})


export class TimelineLikeButtonComponent implements OnInit {

  @Input() alreadyLiked: boolean;
  @Input() imageId: string;
  @Input() user: string;
  @Input() version: any;
  @Input() usernameID: string;
  @Output() liked: EventEmitter<boolean> = new EventEmitter();
  onUpdateImageLikeSubscription: Subscription | null = null;
  likeclicked;

  constructor(
    public api: APIService,
    public mediaService: MediaService,
    public platform: Platform,
  ) { }

  async getLikesforPost(id){
    return await this.api.GetPostLikes(id).then(data => data)
  }

  async ngOnInit() {}

  async likeEvent(id){
    if(this.platform.is('hybrid')){
      await Haptics.impact({ style: ImpactStyle.Heavy})
    }

    this.likeclicked = true;
    this.alreadyLiked = !this.alreadyLiked;
    this.imageId = id;
    this.liked.emit(this.alreadyLiked)
    let likeResponse = await this.getLikesforPost(this.imageId).then(data => data)
    let likeArray = JSON.parse(JSON.stringify(likeResponse)).likes;

  //   // this.cachingService.clearAllCachedData();

    if(likeArray == null){
      let likeArray = []
      likeArray.push(this.usernameID)
      likeArray = [...new Set(likeArray)];

      this.api.UpdateImagePost({id: this.imageId, likes: JSON.stringify({usernames: likeArray})})
      this.likeclicked = false;
    } else {
      likeArray = JSON.parse(likeArray).usernames;
      let index = likeArray.indexOf(this.usernameID);
      
      if(index > -1){
        likeArray.splice(index, 1);
        likeArray = [...new Set(likeArray)];
        this.api.UpdateImagePost({id: this.imageId, likes: JSON.stringify({usernames: likeArray})})
        this.likeclicked = false;
      } else {
        likeArray.push(this.usernameID)
        likeArray = [...new Set(likeArray)];
        this.api.UpdateImagePost({id: this.imageId, likes: JSON.stringify({usernames: likeArray})})
        this.likeclicked = false;
      }
    }

  }


}

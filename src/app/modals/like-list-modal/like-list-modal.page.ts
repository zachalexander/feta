import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from "../../API.service";
import { MediaService } from 'src/app/services/media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like-list-modal',
  templateUrl: './like-list-modal.page.html',
  styleUrls: ['./like-list-modal.page.scss'],
})

export class LikeListModalPage implements OnInit {

  likes: any = [];
  image: boolean;
  imageID;

  constructor(
    private router: Router, 
    private modalController: ModalController, 
    private api: APIService,
    private mediaService: MediaService
    ) { }
  
  async ngOnInit() {

    await this.api.GetPostLikes(this.imageID).then(async image => {

      let likeData = JSON.parse(image.likes).usernames

      let usernames = [];
      await likeData.map(async (usernameIDs) => {
        let user = await this.api.GetUsername(usernameIDs.toString())
        let profile = await this.api.GetProfile(user.profileID)
        let photoUrl: string;

        if(profile.profilepictureID !== null){
          let profilePicUrl = await this.api.GetProfilePictureProfileID(user.profileID)
          if(profilePicUrl){
            photoUrl = await this.mediaService.getPhotoUrl(profilePicUrl.imageurl)
            this.image = true;
          } else {
            photoUrl = '../../../assets/avatar.svg';
            this.image = false;
          }
        } else {
          photoUrl = '../../../assets/avatar.svg';
          this.image = false;
        }

        usernames.push([user.username, profile.family_name, photoUrl, this.image])
      })
      this.likes = usernames;
    })
  }

  viewProfile(username){
    console.log(username)
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(["profile", username[0]]);
  }


  backToWall(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}

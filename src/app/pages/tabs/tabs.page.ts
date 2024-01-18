import { Component } from '@angular/core';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  username;
  urlUser;
  homeclick;
  timelineclick;
  messageclick;
  profileclick;
  needRegister;
  profilePicture;
  hasProfilePic: boolean;

  constructor(
    private api: APIService,
  ) {}
  
  async ngOnInit(){

    setTimeout(async () => {
      this.username = localStorage.getItem('username')
      if(!this.username){
        this.needRegister = true;
      } else {
  
        this.needRegister = false;
        this.username = localStorage.getItem('username');
  
        this.profilePicture = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'));
    
        if(this.profilePicture){
          this.profilePicture = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + this.profilePicture.imageurl;
  
            if(this.profilePicture){
              this.hasProfilePic = true;
            } else {
              this.hasProfilePic = false;
            }
        }
      }
    }, 2000)
  }

  homeClick(){
    this.homeclick = true;
    this.timelineclick = false;
    this.messageclick = false;
    this.profileclick = false;
  }

  timelineClick(){
    this.homeclick = false;
    this.timelineclick = true;
    this.messageclick = false;
    this.profileclick = false;

  }

  messageClick(){
    this.homeclick = false;
    this.timelineclick = false;
    this.messageclick = true;
    this.profileclick = false;

  }

  profileClick(){
    this.homeclick = false;
    this.timelineclick = false;
    this.messageclick = false;
    this.profileclick = true;
  }

}

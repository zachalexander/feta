import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/API_backup_sept14.service';
import { Storage } from 'aws-amplify'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  username;
  homeclick;
  timelineclick;
  messageclick;
  profileclick;
  needRegister;
  profilePicture;
  hasProfilePic: boolean;

  constructor(
    private router: Router,
    private api: APIService
  ) {}

  async ngOnInit(){
    this.username = localStorage.getItem('username');

    this.profilePicture = await this.api.GetProfilePictureProfileID(localStorage.getItem('profileID'))
    this.profilePicture = await Storage.get('profile-pictures/' + this.profilePicture.imageurl)

    if(this.profilePicture){
      this.hasProfilePic = true;
    } else {
      this.hasProfilePic = false;
    }

    if(this.username){
      this.needRegister = false;
      if(this.router.url == '/home'){
        this.homeclick = true;
      } else if(this.router.url == '/timeline'){
        this.timelineclick = true;
      } else if(this.router.url == '/message-board'){
        this.messageclick = true;
      } else {
        this.profileclick = true;
      }
    } else {
      this.needRegister = true;
    }

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

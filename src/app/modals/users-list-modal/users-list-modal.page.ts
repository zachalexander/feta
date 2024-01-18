import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list-modal',
  templateUrl: './users-list-modal.page.html',
  styleUrls: ['./users-list-modal.page.scss'],
})
export class UsersListModalPage implements OnInit {

  userList: any = [];

  constructor(
    private api: APIService,
    private modalController: ModalController,
    private router: Router
  ) { }

  async getUserList(){
    return await this.api.ListProfiles();
  }

  async ngOnInit() {
    this.userList = await this.getUserList();
    this.userList = this.userList.items;
    console.log(this.userList)
  }

  backToWall() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  viewProfile(username) {
    console.log(username)
    this.modalController.dismiss({
      'dismissed': true
    });
    this.router.navigate(["profile", username]);
  }
}

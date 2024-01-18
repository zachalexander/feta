import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-rules-modal',
  templateUrl: './app-rules-modal.page.html',
  styleUrls: ['./app-rules-modal.page.scss'],
})
export class AppRulesModalPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  backToWall() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

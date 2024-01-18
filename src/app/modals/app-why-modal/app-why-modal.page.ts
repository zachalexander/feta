import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-why-modal',
  templateUrl: './app-why-modal.page.html',
  styleUrls: ['./app-why-modal.page.scss'],
})
export class AppWhyModalPage implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-of-service-modal',
  templateUrl: './terms-of-service-modal.page.html',
  styleUrls: ['./terms-of-service-modal.page.scss'],
})
export class TermsOfServiceModalPage implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-baseball-chatroom',
  templateUrl: './baseball-chatroom.page.html',
  styleUrls: ['./baseball-chatroom.page.scss'],
})
export class BaseballChatroomPage implements OnInit {

  baseballData;
  sportsGameID;
  accordionOpen;

  constructor(
    private modalController: ModalController
  ) { }


  openAccordion(){

    if(!this.accordionOpen){
      let d = document.getElementById("accordion")
      d.classList.remove("accordion-collapsed")
      d.classList.remove("accordion-animated")
      d.className += "ios hydrated"
      d.className += " accordion-expanded"
      this.accordionOpen = true;
    } else {
      let d = document.getElementById("accordion")
      d.classList.remove("accordion-expanded")
      d.className = " accordion-collapsed"
      this.accordionOpen = false;
    }
  }

  ngOnInit() {
    this.accordionOpen = false;
    console.log(this.baseballData)
    console.log(this.sportsGameID)
  }

  backToHub() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

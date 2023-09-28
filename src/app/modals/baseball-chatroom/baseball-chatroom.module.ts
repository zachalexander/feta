import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaseballChatroomPageRoutingModule } from './baseball-chatroom-routing.module';

import { BaseballChatroomPage } from './baseball-chatroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaseballChatroomPageRoutingModule
  ],
  declarations: [BaseballChatroomPage]
})
export class BaseballChatroomPageModule {}

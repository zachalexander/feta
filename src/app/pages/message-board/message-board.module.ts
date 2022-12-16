import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageBoardPage } from './message-board.page';
import { HomeComponentModule } from '../../components/home/home.module';

import { MessageBoardPageRoutingModule } from './message-board-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    MessageBoardPageRoutingModule
  ],
  declarations: [MessageBoardPage]
})
export class MessageBoardPageModule {}

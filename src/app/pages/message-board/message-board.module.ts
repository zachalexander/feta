import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageBoardPage } from './message-board.page';

import { MessageBoardPageRoutingModule } from './message-board-routing.module';
import { SharedmodulePageModule } from '../sharedmodule/sharedmodule.module';

@NgModule({
  imports: [
    CommonModule,
    MessageBoardPageRoutingModule,
    SharedmodulePageModule
  ]
})
export class MessageBoardPageModule {}

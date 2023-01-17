import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikeListModalPageRoutingModule } from './like-list-modal-routing.module';

import { LikeListModalPage } from './like-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikeListModalPageRoutingModule
  ],
  declarations: [LikeListModalPage]
})
export class LikeListModalPageModule {}

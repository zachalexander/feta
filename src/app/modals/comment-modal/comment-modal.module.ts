import { SharedmodulePageModule } from './../../pages/sharedmodule/sharedmodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentModalPageRoutingModule } from './comment-modal-routing.module';

import { CommentModalPage } from './comment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentModalPageRoutingModule,
    SharedmodulePageModule
  ],
  declarations: [CommentModalPage]
})
export class CommentModalPageModule {}

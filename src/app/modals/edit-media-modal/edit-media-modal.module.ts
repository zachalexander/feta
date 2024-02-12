import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMediaModalPageRoutingModule } from './edit-media-modal-routing.module';

import { EditMediaModalPage } from './edit-media-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMediaModalPageRoutingModule
  ],
  declarations: [EditMediaModalPage]
})
export class EditPhotoModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMediaModalPageRoutingModule } from './create-media-modal-routing.module';

import { CreateMediaModalPage } from './create-media-modal.page';

import { ImageResizer, ImageResizerOptions } from '@awesome-cordova-plugins/image-resizer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateMediaModalPageRoutingModule
  ],
  declarations: [CreateMediaModalPage],
  providers: [ImageResizer]
})
export class CreatePhotoModalPageModule {}

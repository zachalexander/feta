import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProfileModalPageRoutingModule } from './create-profile-modal-routing.module';

import { CreateProfileModalPage } from './create-profile-modal.page';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateProfileModalPageRoutingModule,
    ImageCropperModule,
    SwiperModule
  ],
  declarations: [CreateProfileModalPage]
})
export class CreateProfileModalPageModule {}

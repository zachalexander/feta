import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePicturePageRoutingModule } from './profile-picture-routing.module';

import { ProfilePicturePage } from './profile-picture.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePicturePageRoutingModule,
    ImageCropperModule
  ],
  declarations: [ProfilePicturePage]
})
export class ProfilePicturePageModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMediaClickPageRoutingModule } from './profile-media-click-routing.module';

import { ProfileMediaClickPage } from './profile-media-click.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMediaClickPageRoutingModule
  ],
  declarations: [ProfileMediaClickPage],
  providers: []
})
export class ProfileMediaClickPageModule {}

import { SharedmodulePageModule } from './../sharedmodule/sharedmodule.module';
import { ProfileMediaClickPage } from './../../modals/profile-media-click/profile-media-click.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';

import { ProfilePageRoutingModule } from './profile-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    SharedmodulePageModule
  ]
})
export class ProfilePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMenuModalPageRoutingModule } from './profile-menu-modal-routing.module';

import { ProfileMenuModalPage } from './profile-menu-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMenuModalPageRoutingModule
  ],
  declarations: [ProfileMenuModalPage]
})
export class ProfileMenuPageModule {}

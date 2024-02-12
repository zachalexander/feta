import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProfileModalPageRoutingModule } from './update-profile-modal-routing.module';

import { UpdateProfileModalPage } from './update-profile-modal.page';
import { FA } from 'src/app/FA.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateProfileModalPageRoutingModule
  ],
  declarations: [UpdateProfileModalPage],
  providers: [FA]
})
export class UpdateProfileModalPageModule {}

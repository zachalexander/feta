import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppWhyModalPageRoutingModule } from './app-why-modal-routing.module';

import { AppWhyModalPage } from './app-why-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppWhyModalPageRoutingModule
  ],
  declarations: [AppWhyModalPage]
})
export class AppWhyModalPageModule {}

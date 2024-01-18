import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppRulesModalPageRoutingModule } from './app-rules-modal-routing.module';

import { AppRulesModalPage } from './app-rules-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppRulesModalPageRoutingModule
  ],
  declarations: [AppRulesModalPage]
})
export class AppRulesModalPageModule {}

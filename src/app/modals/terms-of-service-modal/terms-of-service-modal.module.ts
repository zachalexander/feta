import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsOfServiceModalPageRoutingModule } from './terms-of-service-modal-routing.module';

import { TermsOfServiceModalPage } from './terms-of-service-modal.page';
import { SharedmodulePageModule } from 'src/app/pages/sharedmodule/sharedmodule.module';
import { HomeComponentModule } from 'src/app/components/home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsOfServiceModalPageRoutingModule,
    HomeComponentModule,
    SharedmodulePageModule
  ],
  declarations: [TermsOfServiceModalPage]
})
export class TermsOfServiceModalPageModule {}

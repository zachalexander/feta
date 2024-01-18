import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersListModalPageRoutingModule } from './users-list-modal-routing.module';

import { UsersListModalPage } from './users-list-modal.page';
import { SharedmodulePageModule } from 'src/app/pages/sharedmodule/sharedmodule.module';
import { HomeComponentModule } from 'src/app/components/home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersListModalPageRoutingModule,
    HomeComponentModule,
    SharedmodulePageModule
  ],
  declarations: [UsersListModalPage]
})
export class UsersListModalPageModule {}

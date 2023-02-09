import { SharedmodulePage } from './../sharedmodule/sharedmodule.page';
import { SharedmodulePageModule } from './../sharedmodule/sharedmodule.module';
import { ProfileMediaClickPage } from './../../modals/profile-media-click/profile-media-click.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { HomeComponentModule } from '../../components/home/home.module';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { DateSuffix } from './../../pipes/date-suffix.pipe';
import { DateAsAgoShortPipe } from './../../pipes/date-as-ago-short.pipe';
import { DateAsAgoPipe } from './../../pipes/date-as-ago.pipe';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    ProfilePageRoutingModule,
    SharedmodulePageModule
  ],
  declarations: [ProfilePage, ProfileMediaClickPage]
})
export class ProfilePageModule {}

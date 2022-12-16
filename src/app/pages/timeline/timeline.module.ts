import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelinePage } from './timeline.page';
import { HomeComponentModule } from '../../components/home/home.module';

import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    TimelineRoutingModule
  ],
  declarations: [TimelinePage]
})
export class TimelinePageModule {}

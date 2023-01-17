import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelinePage } from './timeline.page';
import { HomeComponentModule } from '../../components/home/home.module';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { TimelineLikeButtonComponent } from 'src/app/components/timeline-like-button/timeline-like-button.component';
import { SwiperModule } from 'swiper/angular';

import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    TimelineRoutingModule,
    SwiperModule
  ],
  declarations: [TimelinePage, TimelineComponent, TimelineLikeButtonComponent]
})
export class TimelinePageModule {}

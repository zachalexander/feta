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
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { Storage } from '@ionic/storage-angular';

import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { DateAsAgoShortPipe } from 'src/app/pipes/date-as-ago-short.pipe';
import { DateSuffix } from 'src/app/pipes/date-suffix.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    TimelineRoutingModule,
    SwiperModule
  ],
  declarations: [TimelineComponent, TimelinePage, TimelineLikeButtonComponent, DateAsAgoPipe, DateAsAgoShortPipe, DateSuffix],
  providers: [PreviewAnyFile, Storage],
  exports: [TimelineComponent]
})
export class TimelinePageModule {}

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

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    TimelineRoutingModule,
    SwiperModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [TimelinePage, TimelineComponent, TimelineLikeButtonComponent],
  providers: [PreviewAnyFile, Storage]
})
export class TimelinePageModule {}

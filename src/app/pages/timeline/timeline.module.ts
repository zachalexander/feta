import { SharedmodulePageModule } from './../sharedmodule/sharedmodule.module';
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
import {ImagekitioAngularModule} from 'imagekitio-angular';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { ImageResizer } from '@awesome-cordova-plugins/image-resizer/ngx';
import { VideoEditor } from '@awesome-cordova-plugins/video-editor/ngx';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeComponentModule,
    TimelineRoutingModule,
    SwiperModule,
    ImagekitioAngularModule.forRoot({ publicKey: "public_v0ZRYzV4lOI5If5qxln+o4rYx3k=", urlEndpoint: "https://ik.imagekit.io/bkf4g8lrl" }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    SharedmodulePageModule
  ],
  declarations: [TimelinePage],
  providers: [PreviewAnyFile, Storage, ImageResizer, VideoEditor],
  exports: []
})
export class TimelinePageModule {}

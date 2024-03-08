import { SharedmodulePageModule } from './../sharedmodule/sharedmodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { Storage } from '@ionic/storage-angular';
import { ImageResizer } from '@awesome-cordova-plugins/image-resizer/ngx';
import { VideoEditor } from '@awesome-cordova-plugins/video-editor/ngx';
import { FA } from 'src/app/FA.service';

@NgModule({
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedmodulePageModule
  ],
  providers: [PreviewAnyFile, Storage, ImageResizer, VideoEditor, FA]
})
export class TimelinePageModule {}

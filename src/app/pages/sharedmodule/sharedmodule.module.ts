
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedmodulePageRoutingModule } from './sharedmodule-routing.module';

import { SharedmodulePage } from './sharedmodule.page';
import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { DateAsAgoShortPipe } from 'src/app/pipes/date-as-ago-short.pipe';
import { DateSuffixPipe } from 'src/app/pipes/date-suffix.pipe';
import { LikeButtonAlreadyPipe } from 'src/app/pipes/like-button-already.pipe';

import { SwiperModule } from 'swiper/angular';
import {ImagekitioAngularModule} from 'imagekitio-angular';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

import { InViewportDirective } from 'ng-in-viewport';
import { CommentModalPage } from 'src/app/modals/comment-modal/comment-modal.page';
import { TabsPage } from '../tabs/tabs.page';
import { HomePage } from '../home/home.page';
import { MessageBoardPage } from '../message-board/message-board.page';
import { ProfilePage } from '../profile/profile.page';

import { TimelineComponent } from './../../components/timeline/timeline.component';
import { TimelineLikeButtonComponent } from './../../components/timeline-like-button/timeline-like-button.component';
import { TimelinePage } from '../timeline/timeline.page';
import { ProfileMediaClickPage } from 'src/app/modals/profile-media-click/profile-media-click.page';




@NgModule({
  imports: [
    SharedmodulePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SwiperModule,
    ImagekitioAngularModule.forRoot({ publicKey: "public_v0ZRYzV4lOI5If5qxln+o4rYx3k=", urlEndpoint: "https://ik.imagekit.io/bkf4g8lrl" }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    InViewportDirective
  ],
  declarations: [
    SharedmodulePage,
    CommentModalPage,
    TabsPage,
    HomePage, 
    TimelinePage,
    TimelineComponent,
    TimelineLikeButtonComponent,
    MessageBoardPage, 
    ProfilePage,
    ProfileMediaClickPage,
    DateAsAgoPipe, 
    DateAsAgoShortPipe, 
    DateSuffixPipe, 
    LikeButtonAlreadyPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedmodulePage,
    CommentModalPage,
    TabsPage,
    HomePage,
    TimelinePage,
    TimelineComponent,
    TimelineLikeButtonComponent,
    MessageBoardPage,
    ProfilePage,
    ProfileMediaClickPage,
    DateAsAgoPipe,
    DateAsAgoShortPipe,
    DateSuffixPipe, 
    LikeButtonAlreadyPipe,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
  ]
})
export class SharedmodulePageModule {
  static forRoot() {
    return {
      NgModule: SharedmodulePageModule,
      providers: []
    }
  }
}

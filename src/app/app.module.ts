import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import awsconfig from '../aws-exports';
import awsvideoconfig from '../aws-exports';

import { CreateProfileModalPage } from './modals/create-profile-modal/create-profile-modal.page';
import { UpdateProfileModalPage } from './modals/update-profile-modal/update-profile-modal.page';
import { ProfileMenuModalPage } from './modals/profile-menu-modal/profile-menu-modal.page';
import { CreateMediaModalPage } from './modals/create-media-modal/create-media-modal.page';
import { ProfilePicturePage } from './pages/profile-picture/profile-picture.page';
import { LikeListModalPage } from './modals/like-list-modal/like-list-modal.page';
import { BaseballChatroomPage } from './modals/baseball-chatroom/baseball-chatroom.page';
import { UsersListModalPage } from './modals/users-list-modal/users-list-modal.page';
import { TermsOfServiceModalPage } from './modals/terms-of-service-modal/terms-of-service-modal.page';
import { AppRulesModalPage } from './modals/app-rules-modal/app-rules-modal.page';
import { AppWhyModalPage } from './modals/app-why-modal/app-why-modal.page';
import { EditMediaModalPage } from './modals/edit-media-modal/edit-media-modal.page';

import { SwiperModule } from 'swiper/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import {ImagekitioAngularModule} from 'imagekitio-angular';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgStreamingModule} from '@videogular/ngx-videogular/streaming';
import { SharedmodulePageModule } from './pages/sharedmodule/sharedmodule.module';


Amplify.configure(awsconfig);
Amplify.configure(awsvideoconfig);

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    CreateProfileModalPage,
    UpdateProfileModalPage,
    ProfileMenuModalPage,
    ProfilePicturePage,
    CreateMediaModalPage,
    LikeListModalPage,
    BaseballChatroomPage,
    TermsOfServiceModalPage,
    UsersListModalPage,
    AppRulesModalPage,
    AppWhyModalPage,
    EditMediaModalPage
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AmplifyAuthenticatorModule,
    SwiperModule,
    ReactiveFormsModule,
    ImageCropperModule,
    IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    }),
    ImagekitioAngularModule.forRoot({publicKey:"public_v0ZRYzV4lOI5If5qxln+o4rYx3k=", urlEndpoint: "https://ik.imagekit.io/bkf4g8lrl"}),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    SharedmodulePageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

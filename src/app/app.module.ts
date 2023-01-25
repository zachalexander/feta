import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';

import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import awsconfig from '../aws-exports';

import { CreateProfileModalPage } from './modals/create-profile-modal/create-profile-modal.page';
import { UpdateProfileModalPage } from './modals/update-profile-modal/update-profile-modal.page';
import { ProfileMenuModalPage } from './modals/profile-menu-modal/profile-menu-modal.page';
import { CreateMediaModalPage } from './modals/create-media-modal/create-media-modal.page';
import { ProfilePicturePage } from './pages/profile-picture/profile-picture.page';
import { LikeListModalPage } from './modals/like-list-modal/like-list-modal.page';

import { SwiperModule } from 'swiper/angular';
import { ImageCropperModule } from 'ngx-image-cropper';

import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    AddPhotoComponent,
    CreateProfileModalPage,
    UpdateProfileModalPage,
    ProfileMenuModalPage,
    ProfilePicturePage,
    CreateMediaModalPage,
    LikeListModalPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AmplifyAuthenticatorModule,
    SwiperModule,
    ReactiveFormsModule,
    ImageCropperModule,
    IonicStorageModule.forRoot({
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

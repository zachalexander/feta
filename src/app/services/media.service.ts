import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@aws-amplify/storage';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { APIService } from "../API.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  async getPhotoUrl(key){
    return await Storage.get(key);
  }

  async getPhotoUrls(media){
    return media.map(async keys => {
      keys.url;
    })
  }
}

import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@aws-amplify/storage';
import { Auth } from '@aws-amplify/auth';
import { Router } from '@angular/router';
import { APIService } from "../API.service";
import API, { graphqlOperation} from "@aws-amplify/api-graphql";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  blob;
  filename;
  mediaPosted;

  constructor(
    private api: APIService
  ) { }

  async getPhotoUrl(key){
    return await Storage.get(key);
  }

  async getPhotoUrls(media){
    return media.map(async keys => {
      keys.url;
    })
  }

  async getPhotoUrlsKey(media){
    media.map(async keys => {
      keys.url = await Storage.get(keys.s3_key)
    })
    return media;
  }

  public async addNewToGallery() {

    const profileId = localStorage.getItem('profileID')
    const usernameID = await (await this.api.GetUsernameDataFromProfileId(profileId)).id

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      allowEditing: false,
      quality: 100
    });

    const savePhotoBase64 = await fetch(capturedPhoto.webPath)
    this.blob = await savePhotoBase64.blob()
    this.filename = 'zach-uploads/zach_upload_' + new Date().toJSON() + '.jpg'
    
    try {
      localStorage.setItem('blob-string', URL.createObjectURL(this.blob))
      localStorage.setItem('filename-string', this.filename)

      return {
        status: true
      }

    } catch(error){
      console.log('error occurred saving to local storage: ', error)
      return false;
    }
  }

  async getDataFromGraphQL(currentUser){
    const statement = `query MyQuery {
      listImagePosts {
        items {
          usernameID
          comments
          createdAt
          description
          id
          likes
          time_posted
          updatedAt
          s3_key
          profile {
            profilepicture {
              imageurl
            }
          }
          username {
            username
          }
        }
      }
    }`;

    const response = (await API.graphql(graphqlOperation(statement))) as any;
    let array: any = response.data.listImagePosts.items;

    this.mediaPosted = [];
    await Promise.all(array.map(async posts => {
      // if((!posts._deleted)){
        this.mediaPosted.push({
          url: await this.convertUrlToBase64(await Storage.get(posts.s3_key)),
          isVideo: await this.checkForVideo(posts.s3_key),
          time_posted: new Date(posts.time_posted),
          usernameID: posts.usernameID,
          description: posts.description,
          id: posts.id,
          imagesID: posts.imagesID,
          likes: posts.likes,
          // comment_count: await this.commentLength(posts.comments),
          like_count: await this.getLikeCount(posts.likes),
          username: posts.username.username,
          userLiked: await this.getLikeData(posts.likes, currentUser),            
          profilePicture: await this.convertUrlToBase64(await Storage.get(posts.profile.profilepicture.imageurl))
        })
      // }
    }))
    this.mediaPosted = this.sortByDate(this.mediaPosted)
    return [this.mediaPosted, this.mediaPosted.length]
  }

  async checkForVideo(filename){
    let extension = filename.split('.')[2]
    if(extension === 'mov' || extension === 'mp4' || extension === 'ogg' || extension === 'webm'){
      return true
    } else {
      return false
    }
  }

  async convertUrlToBase64(url){
    const response = await fetch(`${url}`);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
  }

  async getLikeData(likes, usernameID) {
    if(!JSON.parse(likes)){
      return false;
    } else {
      if(!JSON.parse(likes)['usernames']){
        return false;
      } else {
        let usersThatLike = [];
        usersThatLike = JSON.parse(likes)['usernames'];
        if(usersThatLike.indexOf(usernameID) > -1){
          return true;
        } else {
          return false;
        }
      }
    }
  }

  async getLikeCount(likesArray) {
    if (JSON.parse(likesArray)) {
      if (JSON.parse(likesArray)['usernames']) {
        likesArray = JSON.parse(likesArray)['usernames']
        return likesArray.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  sortByDate(array) {
    return array.sort((a, b) => b.time_posted - a.time_posted)
  }
}

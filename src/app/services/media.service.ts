import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@aws-amplify/storage';
import { APIService } from "../API.service";
import API, { graphqlOperation} from "@aws-amplify/api-graphql";
import { DomSanitizer } from '@angular/platform-browser';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CachingService } from './caching.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  blob;
  filename;
  mediaPosted;

  constructor(
    private api: APIService,
    private sanitizer: DomSanitizer,
    private cachingService: CachingService
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


  getProfileData(profileID, cache) {
    let url = 'profile-data-' + profileID;
    return this.checkCache(url, profileID, cache)
  }

  private checkCache(url, profileID, cache): Observable<any> {
    url = `${url}?={0,n}`;

    if(!cache){
      return this.callAndCacheProfile(url, profileID)
    } else {
      const storedValue = from(this.cachingService.getCachedRequest(url));
      return storedValue.pipe(
        switchMap(result => {
          if (!result) {
            console.log('full api call')
            return this.callAndCacheProfile(url, profileID);
          } else {
            console.log('cached result')
            return of(result);
          }
        })
      )
    }
  }

  private callAndCacheProfile(url, profileID): Observable<any> {
    return from(this.getUserProfileMediaData(profileID)).pipe(
      tap(res => {
        this.cachingService.cacheRequests(url, res);
      })
    )
  }




  getTimelineData(): Observable<any> {
    let currentUser = localStorage.getItem('usernameID');
    let url = 'family-timeline-' + currentUser;

    return this.getData(currentUser).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getTimelineDataPaginated(token): Observable<any> {
    let currentUser = localStorage.getItem('usernameID');
    let tokenNext = token;

    return this.getDataPaginated(currentUser, tokenNext).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  private getData(currentUser): Observable<any> {
    return from(this.getDataFromGraphQLTop4(currentUser))
  }


  async getUserProfileMediaCount(profileID: String): Promise<any> {

    const statement = `query getUserProfileMediaData($profileID: ID!) {
      imagePostsByProfileID(profileID: $profileID) {
        items {
          mediaSourceMobile
          mediaSourceDesktop
          profileID
          id
          posterImage
        }
      }
    }`;

    const gqlAPIServiceArguments: any = {
      profileID
    };

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    let array: any = response.data.imagePostsByProfileID.items;
    return array;
  }


  async getUserProfileMediaData(profileID: String): Promise<any> {

    const statement = `query getUserProfileMediaData($profileID: ID!) {
      imagePostsByProfileID(profileID: $profileID) {
        items {
          time_posted
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          profileID
          description
          likes
          id
          posterImage
        }
      }
    }`;

    const gqlAPIServiceArguments: any = {
      profileID
    };

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    console.log(response.data.imagePostsByProfileID)
    let array: any = response.data.imagePostsByProfileID.items;

    let photosPosted = [];
    let videosPosted = [];
    await Promise.all(array.map(async posts => {
      if (await this.checkForVideo(posts.s3_key) === false) {
        photosPosted.push({
          time_posted: posts.time_posted,
          s3_key: posts.s3_key,
          mediaSourceMobile: posts.mediaSourceMobile,
          mediaSourceDesktop: posts.mediaSourceDesktop,
          base64: await this.imageUrlToBase64(posts.mediaSourceMobile),
          profileID: posts.profileID,
          description: posts.description,
          likes: posts.likes,
          id: posts.id
        })
      } else {
        videosPosted.push({
          time_posted: posts.time_posted,
          posterImage: await Storage.get(posts.posterImage, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
          profileID: posts.profileID,
          description: posts.description,
          likes: posts.likes,
          id: posts.id
        })
      }
    }))
    return [photosPosted, photosPosted.length, videosPosted, videosPosted.length, response.data.imagePostsByProfileID.nextToken];
  }

  async imageUrlToBase64(url) {
    const response = await fetch(`${url}`)
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

  private callAndCache(url, currentUser): Observable<any> {
    return from(this.getDataFromGraphQL(currentUser)).pipe(
      tap(res => {
        this.cachingService.cacheRequests(url, res);
      })
    )
  }

  private getDataPaginated(currentUser, token): Observable<any> {
    return from(this.getDataFromGraphQLPaginated(currentUser, token))
  }

  async callAndCacheImageId(currentUser){
    const statement = `query timelineImages {
      imagePostsBySorterValueAndTime_posted(sorterValue: "media", sortDirection: DESC, limit: 2) {
        items {
          usernameID
          id
          posterImage
          mediaSourceMobile
          mediaSourceDesktop
        }
      }
    }`

    const response = await API.graphql(graphqlOperation(statement)) as any
    let array: any = response.data.imagePostsBySorterValueAndTime_posted.items;

    let mediaArray = []
    await Promise.all(array.map(async posts => {
      if(posts.mediaSourceMobile){
        mediaArray.push({
          imageId: posts.id,
          base64Mobile: await this.imageUrlToBase64(posts.mediaSourceMobile),
          base64Desktop: await this.imageUrlToBase64(posts.mediaSourceDesktop)
        })
      }
    }))
    return mediaArray;
  }


  async getDataFromGraphQLPaginated(currentUser, tokenNext: string) {
    const statement = `query timelineSorted($tokenNext: String)  {
      imagePostsBySorterValueAndTime_posted(sorterValue: "media", sortDirection: DESC, limit: 4, nextToken: $tokenNext) {
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
          posterImage
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          profile {
            profilepicture {
              imageurl
            }
          }
          username {
            username
          }
        }
        nextToken
      }
    }`;

    const response = await API.graphql(graphqlOperation(statement, {tokenNext})) as any
    let array: any = response.data.imagePostsBySorterValueAndTime_posted.items;

    this.mediaPosted = [];
    await Promise.all(array.map(async posts => {
      if (await this.checkForVideo(posts.s3_key)) {
        this.mediaPosted.push({
          mediaSourceMobile: await Storage.get(posts.s3_key, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
          mediaSourceDesktop: null,
          s3_key: posts.s3_key,
          downloadableVideo: posts.downloadableVideo,
          isVideo: true,
          time_posted: new Date(posts.time_posted),
          usernameID: posts.usernameID,
          description: posts.description,
          id: posts.id,
          likes: posts.likes,
          posterImage: await Storage.get(posts.posterImage, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
          comments: +await this.commentLength(posts.id),
          like_count: await this.getLikeCount(posts.likes),
          username: posts.username.username,
          userLiked: await this.getLikeData(posts.likes, currentUser),
          profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
        })
      } else {
        this.mediaPosted.push({
          mediaSourceMobile: await this.checkLocalStorageImage(posts.id, currentUser, posts.mediaSourceMobile, "timeline-image-"),
          mediaSourceDesktop: await this.checkLocalStorageImage(posts.id, currentUser, posts.mediaSourceDesktop, "timeline-image-"),
          s3_key: posts.s3_key,
          downloadableVideo: posts.downloadableVideo,
          isVideo: false,
          time_posted: new Date(posts.time_posted),
          usernameID: posts.usernameID,
          description: posts.description,
          id: posts.id,
          likes: posts.likes,
          comments: +await this.commentLength(posts.id),
          like_count: await this.getLikeCount(posts.likes),
          username: posts.username.username,
          userLiked: await this.getLikeData(posts.likes, currentUser),
          profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
        })
      }
    }))
    // this.mediaPosted = this.sortByDate(this.mediaPosted)
    return [this.mediaPosted, this.mediaPosted.length, response.data.imagePostsBySorterValueAndTime_posted.nextToken]
  }

  async checkLocalStorageImage(id, currentUser, url, key){
    let cachedData: any = await this.cachingService.getCachedRequest(key+id)
    if(cachedData && cachedData.imageId === id){
      return cachedData.base64Mobile;
    } else {
      let base64Value = await this.convertUrlToBase64(url)
      await this.cachingService.cacheRequests(key+id, { "imageId": id, "base64Mobile": base64Value, "base64Desktop": base64Value })
      return base64Value;
    }
  }

  async getDataFromGraphQLTop4(currentUser){

    const statement = `query timelineSorted {
      imagePostsBySorterValueAndTime_posted(sorterValue: "media", sortDirection: DESC, limit: 4) {
        items {
          usernameID
          createdAt
          description
          id
          time_posted
          updatedAt
          s3_key
          posterImage
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          likes {
            items {
              id
            }
          }
          comments {
            items {
              id
            }
          }
          profile {
            profilepicture {
              imageurl
            }
          }
          username {
            username
          }
        }
        nextToken
      }
    }`;

    const response = (await API.graphql(graphqlOperation(statement))) as any;
    let array: any = response.data.imagePostsBySorterValueAndTime_posted.items;
    console.log(array);

    this.mediaPosted = array;

    // this.mediaPosted = [];
    // await Promise.all(array.map(async posts => {
    //   console.log(posts)
    //   if (await this.checkForVideo(posts.s3_key)) {
    //     this.mediaPosted.push({
    //       mediaSourceMobile: await Storage.get(posts.s3_key, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
    //       mediaSourceDesktop: null,
    //       s3_key: posts.s3_key,
    //       downloadableVideo: posts.downloadableVideo,
    //       isVideo: true,
    //       time_posted: new Date(posts.time_posted),
    //       usernameID: posts.usernameID,
    //       description: posts.description,
    //       id: posts.id,
    //       likes: posts.likes,
    //       posterImage: await Storage.get(posts.posterImage, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
    //       comments: +(await this.commentLength(posts.id)).toString(),
    //       like_count: await this.getLikeCount(posts.likes),
    //       username: posts.username.username,
    //       userLiked: await this.getLikeData(posts.likes, currentUser),
    //       profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
    //     })
    //   } else {
    //     this.mediaPosted.push({
    //       mediaSourceMobile: posts.mediaSourceMobile,
    //       mediaSourceDesktop: posts.mediaSourceDesktop,
    //       s3_key: posts.s3_key,
    //       downloadableVideo: posts.downloadableVideo,
    //       isVideo: false,
    //       time_posted: new Date(posts.time_posted),
    //       usernameID: posts.usernameID,
    //       description: posts.description,
    //       id: posts.id,
    //       likes: posts.likes,
    //       comments: +(await this.commentLength(posts.id)).toString(),
    //       like_count: await this.getLikeCount(posts.likes),
    //       username: posts.username.username,
    //       userLiked: await this.getLikeData(posts.likes, currentUser),
    //       profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
    //     })
    //   }
    // }))
    // this.mediaPosted = this.sortByDate(this.mediaPosted)
    return [this.mediaPosted, this.mediaPosted.length, response.data.imagePostsBySorterValueAndTime_posted.nextToken]
  }

  async getDataFromGraphQL(currentUser){
    const statement = `query timelineSorted {
      imagePostsBySorterValueAndTime_posted(sorterValue: "media", sortDirection: DESC) {
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
          posterImage
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          profile {
            profilepicture {
              imageurl
            }
          }
          username {
            username
          }
        }
        nextToken
      }
    }`;

    const response = (await API.graphql(graphqlOperation(statement))) as any;
    let array: any = response.data.imagePostsBySorterValueAndTime_posted.items;


    this.mediaPosted = [];
    await Promise.all(array.map(async posts => {
      if(await this.checkForVideo(posts.s3_key)){
        this.mediaPosted.push({
          mediaSourceMobile: await Storage.get(posts.s3_key, {bucket: "fetadevvodservice-dev-output-nk0sepbg"}),
          mediaSourceDesktop: null,
          s3_key: posts.s3_key,
          downloadableVideo: posts.downloadableVideo,
          isVideo: true,
          time_posted: new Date(posts.time_posted),
          usernameID: posts.usernameID,
          description: posts.description,
          id: posts.id,
          likes: posts.likes,
          posterImage: await Storage.get(posts.posterImage, {bucket: "fetadevvodservice-dev-output-nk0sepbg"}),
          comments: +(await this.commentLength(posts.id)).toString(),
          like_count: await this.getLikeCount(posts.likes),
          username: posts.username.username,
          userLiked: await this.getLikeData(posts.likes, currentUser),            
          profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
        })
      } else {
        this.mediaPosted.push({
          mediaSourceMobile: posts.mediaSourceMobile,
          mediaSourceDesktop: posts.mediaSourceDesktop,
          s3_key: posts.s3_key,
          downloadableVideo: posts.downloadableVideo,
          isVideo: false,
          time_posted: new Date(posts.time_posted),
          usernameID: posts.usernameID,
          description: posts.description,
          id: posts.id,
          likes: posts.likes,
          comments: +(await this.commentLength(posts.id)).toString(),
          like_count: await this.getLikeCount(posts.likes),
          username: posts.username.username,
          userLiked: await this.getLikeData(posts.likes, currentUser),
          profilePicture: await this.checkForProfilePhoto(posts.profile.profilepicture)
        })
      }
    }))
    this.mediaPosted = this.sortByDate(this.mediaPosted)
    return [this.mediaPosted, this.mediaPosted.length, response.data.imagePostsBySorterValueAndTime_posted.nextToken]
  }

  async commentLength(imageID){
    let commentArray: [] = await this.api.getImageComments(imageID)
    return commentArray.length
  }


  async checkForVideo(filename){
    let extension = filename.split('.').pop().toLowerCase()
    if(extension === 'mov' || extension === 'mp4' || extension === 'ogg' || extension === 'webm' || extension === 'm3u8'){
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

  async checkForProfilePhoto(url){
    if(url){
      return await Storage.get('profile-pictures/' + url.imageurl)
    } else {
      return false;
    }
  }

  async getProfilePicture(profileID) {
    return await this.api.GetProfilePictureProfileID(profileID.imageurl);
  }

  sortByDate(array) {
    return array.sort((a, b) => b.time_posted - a.time_posted)
  }
}
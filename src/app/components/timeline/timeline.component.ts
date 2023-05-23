import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TimelinePageModule } from 'src/app/pages/timeline/timeline.module';
import { ModalController, Platform } from '@ionic/angular';
// import { PhotoService } from '../../services/photo.service';
import { MediaService } from 'src/app/services/media.service';
// import { CachingService } from '../../services/caching.service';
import { APIService } from "../../API.service";
import { ActivatedRoute, Router } from '@angular/router';
// import { CommentModalPage } from '../../modals/comment-modal/comment-modal.page';
// import { EditPhotoModalPage } from '../../modals/edit-photo-modal/edit-photo-modal.page';
import { LikeListModalPage } from '../../modals/like-list-modal/like-list-modal.page';
import { Storage } from '@aws-amplify/storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IonInfiniteScroll, IonRefresher, IonRefresherContent} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding} from '@ionic/angular';
import { FormGroup} from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Auth } from '@aws-amplify/auth';
import { Share } from '@capacitor/share';
// import { Network } from '@capacitor/network';

import { finalize } from 'rxjs/operators';

import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { DateAsAgoShortPipe } from 'src/app/pipes/date-as-ago-short.pipe';
import { DateSuffix } from 'src/app/pipes/date-suffix.pipe';

import SwiperCore, { Zoom, EffectFade } from 'swiper';
// import { toast } from 'aws-amplify';
// import { async } from '@angular/core/testing';
// import { Timestamp } from 'rxjs/internal/operators/timestamp';
SwiperCore.use([Zoom, EffectFade]);


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [DateAsAgoPipe, DateAsAgoShortPipe, DateSuffix]
})

export class TimelineComponent implements AfterViewInit{

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher: IonRefresher;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('slides') slides: IonItemSliding;
  @Input('data') data = [];
  @Input('token') token: String;
  @ViewChildren('timelineVideo') videos: QueryList<any>


  nowPlaying = null;
  videoOver = false;
  muted = true;
  replay = false;
  pause;
  videoStyle;
  platformView;
  mobilePlatform;
  
  onCreateImageSubscription: Subscription | null = null;
  onUpdateImageSubscription: Subscription | null = null;
  onDeleteImageSubscription: Subscription | null = null;
  onUpdateCommentSubscription: Subscription | null = null;

  alreadyLiked: boolean;
  loaded: boolean;
  profileSearch: boolean;
  browser: any;

  dataReturned: any;
  wallListLength: any;
  currentUserUsername: any;
  currentUserUsernameID: any;
  commentArray;
  version: any;
  counter_init: any;
  counter_end: any;
  networkStatus: any;
  
  currentUserEditPost = false;
  showFabButton = false;
  scrollFinished = false;
  disableButtons = false;
  
  constructor(
    public api: APIService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public toastController: ToastController,
    public navController: NavController,
    private platform: Platform,
    private loadingController: LoadingController,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mobilePlatform = this.platform.is("mobile");
  }

  functionGetCognitoUserId(){
    return Auth.currentUserInfo().then(user => user.id);
  }

  isElementInViewport(element){
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  didScroll(){
    if(this.nowPlaying && this.isElementInViewport(this.nowPlaying)) return;
    else if(this.nowPlaying && !this.isElementInViewport(this.nowPlaying)){
      this.nowPlaying.pause();
      this.nowPlaying = null;
      this.pause = true;
      this.replay = false;
    }

    this.videos.forEach(player => {
      if(this.nowPlaying) return;
      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if(inView) {
        this.nowPlaying = nativeElement;
        this.nowPlaying.muted = true;
        let playPromise = this.nowPlaying.play();

        if (playPromise !== undefined) {
          playPromise.then(_ => {
            this.nowPlaying.play();
          })
          .catch(error => {
            this.nowPlaying.play();
          })
        }
        this.pause = false;
        this.muted = true;
        this.replay = false;
        this.videoOver = false;
      }
    })
  }


  videoEnd(){
    this.replay = true;
    this.pause = true;
  }

  replayVideo(){
    if(this.nowPlaying){
      this.nowPlaying.play();
      this.nowPlaying.muted = false;
      this.muted = false;
      this.replay = false;
      this.pause = false;
    }
  }

  pauseVideo(){
    if(this.nowPlaying){
      this.nowPlaying.pause();
      this.nowPlaying.muted = true;
      this.replay = false;
      this.muted = true;
      this.pause = true;
    }
  }

  playVideo(){
    if(this.nowPlaying){
      this.nowPlaying.muted = false;
      this.nowPlaying.play();
      this.replay = false;
      this.muted = false;
      this.pause = false;
    }
  }

  unmuteClicked(){
    if(this.nowPlaying){
      this.nowPlaying.muted = false;
      this.muted = false;
    }
  }

  muteClicked(){
    if(this.nowPlaying){
      this.nowPlaying.muted = true;
      this.muted = true;
    }
  }


  async ngOnChanges() {

    this.currentUserUsernameID = localStorage.getItem('usernameID')
    this.browser = localStorage.getItem('User-browser')
    this.platformView = await this.platform.platforms();

    this.didScroll();


    // if (this.platform.is('hybrid')) {

    //   this.platform.resume.subscribe(async (event) => {
    //     document.location.reload();
    //     // await this.refreshData(event);
    //     this.startSubscriptions();
    //   })
    // }

    this.currentUserUsername = await localStorage.getItem('username');
    this.currentUserUsernameID = await localStorage.getItem('usernameID');


    // await Network.addListener('networkStatusChange', async status => {
    //   console.log(status.connected)
    //   this.networkStatus = 'online';
    //   if(!status.connected){
    //     this.networkStatus = 'offline';
    //     const toast = await this.toastController.create({
    //       message: '<strong>You are currently offline</strong>. We cannot load new content and you can only view content until you find a stable connection.',
    //       position: "top",
    //       color: "danger"
    //     });
    //     toast.present().then(() => {
    //       console.log(this.networkStatus)
    //       this.disableButtons = true;
    //       console.log(this.disableButtons)
    //     });

    //   }
    // });


  }


  async ngAfterViewInit() {
    this.didScroll();
    this.startSubscriptions();
  }


  async ngOnDestroy() {
    if(this.onCreateImageSubscription){
      await this.onCreateImageSubscription.unsubscribe();
    }
    if(this.onUpdateImageSubscription){
      await this.onUpdateImageSubscription.unsubscribe();
    }
    if(this.onDeleteImageSubscription){
      await this.onDeleteImageSubscription.unsubscribe();
    }
    this.platform.pause.subscribe(async () => {
      console.log('pausing subscription')
    });
  }

  async presentToastNewPost(){
    this.showFabButton = true;
  }


  openPostSettings(username){
    if(this.currentUserUsername === username){
      this.currentUserEditPost = true;
    }
  }


  // This is for editing and sharing posts on wall

  async clickEditPost(mediaUrl, mediaId) {
    // const modal = await this.modalController.create({
    //   component: EditPhotoModalPage
    // })

    let imageData = [mediaUrl, mediaId]
    // await this.photoService.getImagesID(imageData);
    // await this.photoService.getImagePostDescription();

    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     this.dataReturned = dataReturned.data;
    //   }
    // });

    // return await modal.present();
  }

  async presentActionSheet(username, mediaId, mediaKey, downloadableVideo, isVideo) {

    if(this.currentUserUsername === username){
      this.currentUserEditPost = true;
      const actionSheet = await this.actionSheetController.create({
        header: 'Post Settings',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Edit Post',
          icon: 'pencil-outline',
          handler: () => {

              this.clickEditPost(mediaKey, mediaId);
              
            }
        },
        {
          text: 'Delete Post',
          role: 'destructive',
          icon: 'trash-outline',
          handler: async () => {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Delete Post',
              message: 'Are you sure you want to delete this post?',
              buttons: [
                {
                  text: 'No',
                },
                {
                  text: 'Delete',
                  handler: async () => {

                    await this.api.DeleteImagePost({id: mediaId})

                    if(isVideo){
                      await Storage.remove(downloadableVideo, {bucket: "fetadevvodservice-dev-input-nk0sepbg"})
                    } else {
                      await Storage.remove(mediaKey)
                    }
                    await this.presentToast();
                  }
              }
              ]
            });
        
            await alert.present();
          }
        }, {
          text: 'Share',
          icon: 'share-outline',
          handler: async () => {

            const loading = await this.loadingController.create({
              spinner: 'lines-sharp-small',
              translucent: false,
              cssClass: 'spinner-loading'
            });

            loading.present();

            let media = await this.api.GetImagePost(mediaId)
            if(isVideo){
              let video = await Storage.get(media.downloadableVideo, {bucket: "fetadevvodservice-dev-input-nk0sepbg"})

              if(this.platform.is('desktop' || 'mobileweb' || 'pwa')){
                const fileName = 'feta-download-' + new Date().getTime() + '.mov' 
                this.downloadBlob(video, fileName)
                loading.dismiss()
              }

              if(this.platform.is('hybrid' || 'iphone' || 'ios' || 'mobile' || 'ipad')){
                const response = await fetch(`${video}`)
                const blob = await response.blob();
                const base64Data = await this.convertBlobToBase64(blob) as string;
                const fileName = new Date().getTime() + '.mov';
    
                await Filesystem.writeFile({
                  path: fileName,
                  data: base64Data,
                  directory: Directory.Cache
                }).then(() => {
                  return Filesystem.getUri({
                    directory: Directory.Cache,
                    path: fileName
                  });
                }).then((uriResult) => {
                  loading.dismiss()
                  return Share.share({
                    title: 'Share content',
                    text: "Look at this content from Zach & Katie's Feta app",
                    url: uriResult.uri,
                    dialogTitle: 'Share this content',
                  });
                })
              }
            } else {

              let photo = await Storage.get(mediaKey, { download: true})

              if(this.platform.is('desktop' || 'mobileweb' || 'pwa')){
                const fileName = 'feta-download-' + new Date().getTime() + '.jpeg' 
                this.downloadBlob(photo.Body, fileName)
                loading.dismiss();
              }

              if(this.platform.is('hybrid' || 'iphone' || 'ios' || 'mobile' || 'ipad')){
                const base64Data = await this.readAsBase64(photo.Body)
                const fileName = new Date().getTime() + '.jpeg';
    
                await Filesystem.writeFile({
                  path: fileName,
                  data: base64Data,
                  directory: Directory.Cache
                }).then(() => {
                  return Filesystem.getUri({
                    directory: Directory.Cache,
                    path: fileName
                  });
                }).then((uriResult) => {
                  loading.dismiss();
                  return Share.share({
                    title: 'Share content',
                    text: "Look at this content from Zach & Katie's Feta app",
                    url: uriResult.uri,
                    dialogTitle: 'Share this content',
                  });
                })
              }
            }            
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }]
      });
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();

    } else {
      const actionSheet = await this.actionSheetController.create({
        header: 'Post Settings',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Share',
          icon: 'share-outline',
          handler: () => {
    
            this.shareButtonClicked(mediaId, isVideo, mediaKey)
            
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }]
      });
      await actionSheet.present();
  
      const { role } = await actionSheet.onDidDismiss();

    }
  }

  async shareButtonClicked(id, isVideo, mediaKey){

    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      translucent: false,
      cssClass: 'spinner-loading'
    });

    loading.present();

    let media = await this.api.GetImagePost(id)
    if(isVideo){
      let video = await Storage.get(media.downloadableVideo, {bucket: "fetadevvodservice-dev-input-nk0sepbg"})

      if(this.platform.is('desktop' || 'mobileweb' || 'pwa')){
        const fileName = 'feta-download-' + new Date().getTime() + '.mov' 
        this.downloadBlob(video, fileName)
        loading.dismiss();
      }

      if(this.platform.is('hybrid' || 'iphone' || 'ios' || 'mobile' || 'ipad')){
        const response = await fetch(`${video}`)
        const blob = await response.blob();
        const base64Data = await this.convertBlobToBase64(blob) as string;
        const fileName = new Date().getTime() + '.mov';

        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache
        }).then(() => {
          return Filesystem.getUri({
            directory: Directory.Cache,
            path: fileName
          });
        }).then((uriResult) => {
          loading.dismiss();
          return Share.share({
            title: 'Share content',
            text: "Look at this content from Zach & Katie's Feta app",
            url: uriResult.uri,
            dialogTitle: 'Share this content',
          });
        })     
      }
    } else {
        let photo = await Storage.get(mediaKey, { download: true})

        if(this.platform.is('desktop' || 'mobileweb' || 'pwa')){
          const fileName = 'feta-download-' + new Date().getTime() + '.jpeg' 
          this.downloadBlob(photo.Body, fileName)
          loading.dismiss();
        }

        if(this.platform.is('hybrid' || 'iphone' || 'ios' || 'mobile' || 'ipad')){
          const base64Data = await this.readAsBase64(photo.Body)
          const fileName = new Date().getTime() + '.jpeg';

          await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Cache
          }).then(() => {
            return Filesystem.getUri({
              directory: Directory.Cache,
              path: fileName
            });
          }).then((uriResult) => {
            loading.dismiss();
            return Share.share({
              title: 'Share content',
              text: "Look at this content from Zach & Katie's Feta app",
              url: uriResult.uri,
              dialogTitle: 'Share this content',
            });
          })
        }
      }            
  }

  async downloadBlob(link, filename) {
    const response = await fetch(`${link}`)
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 10);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
    return a;
  }


  async readAsBase64(photo) { 
    return await this.convertBlobToBase64(photo) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob)
  })

  // toast messages

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your post has been successfully deleted.',
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  async presentToastDelete() {
    const toast = await this.toastController.create({
      message: 'Your comment has been successfully deleted.',
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  async presentToastDeleteReply() {
    const toast = await this.toastController.create({
      message: 'Your reply has been successfully deleted.',
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  async seeNewPosts(){
    document.location.reload();
    this.showFabButton = false;
  }

  // modal functions

  // async openModal(id) {
  //   console.log(id)
  //   const modal = await this.modalController.create({
  //     component: CommentModalPage
  //   });

  //   await this.photoService.getPostImageID(id)

  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //       this.dataReturned = dataReturned.data;
  //     }
  //   });
  //   return await modal.present();
  // }

  async showLikesModal(url) {
    const modal = await this.modalController.create({
      component: LikeListModalPage,
      componentProps: {
        imageID: url[1]
      }
    });

    // await this.photoService.getImagesID(url)

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }


  // when user scrolls to bottom, invoke this function

  loadData(event) {
      try {
        this.mediaService.getTimelineDataPaginated(this.token).subscribe((data) => {
          let dataPull = data[0]
          this.token = data[2]

          if (this.token === null) {
            event.target.disabled = true;
            this.scrollFinished = true;
          } 
          Object.entries(dataPull).forEach(([key, value]) => { this.data[this.data.length] = value })
        });
      } catch (error) {
        console.log(error)
      }
      event.target.complete();
  }

  async refreshData(event){

    if(this.platform.is('hybrid')){
      await Haptics.impact({ style: ImpactStyle.Medium})
    }

    window.location.reload();
  }

  scrollToTop(){
    this.ionContent.scrollToTop(400)
  }

  // disabling toggles

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  toggleRefresher() {
    this.ionRefresher.disabled = !this.ionRefresher.disabled;
  }

  startSubscriptions(){
    this.onCreateImageSubscription = <Subscription>(
      this.api.OnCreateImagePostListener().subscribe(async (event: any) => {
        this.presentToastNewPost();
      })
    );

    this.onUpdateImageSubscription = <Subscription>(
      this.api.OnUpdateImagePostListener().subscribe({
        next: async (event: any) => {

          const imageId = event.value.data.onUpdateImagePost.id;


          if((JSON.parse(event.value.data.onUpdateImagePost.likes))){
            let post = await this.api.GetPostLikes(imageId)
            this.data.filter((media) => {
              if(media.id == imageId){
                media.likes = post.likes
                media.like_count = JSON.parse(post.likes)['usernames'].length
              }
              return media;
            })
          }
  
        //   if((JSON.parse(event.value.data.onUpdateImagePost.likes)) && (JSON.parse(event.value.data.onUpdateImagePost.comments))){
  
        //     const likes_updated = await JSON.parse(event.value.data.onUpdateImagePost.likes).usernames.length
        //     const comments_updated = await JSON.parse(event.value.data.onUpdateImagePost.comments)
  
            
  
        //     await this.data.forEach(async photos => {
        //       if((photos.id == imageId) && (comments_updated)){
        //         photos.like_count = likes_updated;
        //         photos.comments = await this.wallService.formatComments(JSON.stringify(comments_updated), imageId);
        //         photos.comment_count = await (await this.wallService.formatComments(JSON.stringify(comments_updated), imageId)).length;
        //       }
        //     })
        //   } 
          
        //   else if(JSON.parse(event.value.data.onUpdateImagePost.likes)) {
        //     const likes_updated = JSON.parse(event.value.data.onUpdateImagePost.likes).usernames.length
        //     this.data.forEach(async photos => {
        //       if((photos.id == imageId)){
        //         photos.like_count = likes_updated;
        //       }
        //     })
        //   } else {
        //     const likes_updated = JSON.parse(event.value.data.onUpdateImagePost.likes).usernames.length
        //     const comments_updated = JSON.parse(event.value.data.onUpdateImagePost.comments)
  
        //     comments_updated.map(async comments => {
        //       comments.username = localStorage.getItem('username');
        //     })
  
        //     this.data.forEach(async photos => {
        //       if((photos.id == imageId) && (comments_updated)){
        //         photos.like_count = likes_updated;
        //         photos.comments = await this.wallService.formatComments(JSON.stringify(comments_updated), imageId);
        //         photos.comment_count = await (await this.wallService.formatComments(JSON.stringify(comments_updated), imageId)).length;
        //       }
        //     })
        //   }
        //   // this.commentLoading = false;
        }
      })
    )
  
    this.onDeleteImageSubscription = <Subscription>(
      this.api.OnDeleteImagePostListener().subscribe((event: any) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    )
  }

}

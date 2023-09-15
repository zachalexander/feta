import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TimelinePageModule } from 'src/app/pages/timeline/timeline.module';
import { ModalController, Platform } from '@ionic/angular';
// import { PhotoService } from '../../services/photo.service';
import { MediaService } from 'src/app/services/media.service';
import { APIService } from "../../API.service";
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModalPage } from '../../modals/comment-modal/comment-modal.page';
// import { EditPhotoModalPage } from '../../modals/edit-photo-modal/edit-photo-modal.page';
import { LikeListModalPage } from '../../modals/like-list-modal/like-list-modal.page';
import { Storage } from '@aws-amplify/storage';
import { BehaviorSubject, Subscription, map } from 'rxjs';
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
import { timeline } from 'console';
import { ConsoleLogger } from '@aws-amplify/core';
// import { toast } from 'aws-amplify';
// import { async } from '@angular/core/testing';
// import { Timestamp } from 'rxjs/internal/operators/timestamp';
SwiperCore.use([Zoom, EffectFade]);
declare var Hls;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [DateAsAgoPipe, DateAsAgoShortPipe, DateSuffix]
})

export class TimelineComponent implements OnInit {

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
  onCreateCommentsSubscription: Subscription | null = null;
  onDeleteCommentsSubscription: Subscription | null = null;

  alreadyLiked: boolean;
  loaded: boolean;
  profileSearch: boolean;
  refresh: boolean;
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


  async ngAfterViewInit() {
    this.didScroll();
    this.startSubscriptions();
  }


  async ngOnDestroy() {
    if (this.onCreateImageSubscription) {
      await this.onCreateImageSubscription.unsubscribe();
    }
    if (this.onUpdateImageSubscription) {
      await this.onUpdateImageSubscription.unsubscribe();
    }
    if (this.onDeleteImageSubscription) {
      await this.onDeleteImageSubscription.unsubscribe();
    }
    if (this.onCreateCommentsSubscription) {
      await this.onCreateCommentsSubscription.unsubscribe();
    }
    if (this.onDeleteCommentsSubscription) {
      await this.onDeleteCommentsSubscription.unsubscribe();
    }
    this.platform.pause.subscribe(async () => {
      console.log('pausing subscription')
    });
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
            console.log(error)
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

  ngOnInit(): void {
  
  }

  async ngOnChanges() {

    this.currentUserUsernameID = localStorage.getItem('usernameID')
    this.browser = localStorage.getItem('User-browser')
    this.platformView = await this.platform.platforms();

    this.didScroll();
    this.startSubscriptions();

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

    setTimeout(() => {
      if (this.data.length < 2) {
        this.profileSearch = true;
      } else  {
        this.profileSearch = false;
      }
    }, 1000)


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

  async openModal(id) {
    const modal = await this.modalController.create({
      component: CommentModalPage,
      componentProps: {
        imageID: id
      }
    });

    // await this.photoService.getPostImageID(id)

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }

  async showLikesModal(url) {
    const modal = await this.modalController.create({
      component: LikeListModalPage,
      componentProps: {
        imageID: url[1]
      }
    });

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
            // event.target.disabled = true;
            this.scrollFinished = true;
          } 
          Object.entries(dataPull).forEach(([key, value]) => { this.data[this.data.length] = value })
          event.target.complete();
        });
      } catch (error) {
        console.log(error)
      }

  }

  async changeLocation(){
    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/timeline', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    }); 

    this.refresh = false;
  }

  scrollToTop(){
    this.ionContent.scrollToTop(400).then(() => {
      this.refresh = true;

      this.mediaService.getTimelineData().pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe(async data => {
        this.data = data[0];
        this.token = data[2];
        this.refresh = false;
        this.scrollFinished = false;
        await this.changeLocation();
        this.showFabButton = false;
      })
    })
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

    this.onCreateCommentsSubscription = <Subscription>(
      this.api.OnCreateCommentsListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onCreateComments.imagePostsID;

          let commentsArray: [] = await this.api.getImageComments(imageId)
          let commentLength: string = commentsArray.length.toString()

          await this.api.UpdateImagePost({ id: imageId, comments: commentLength })

          let timelineData = await this.api.ListImagePosts();

          timelineData.items.map(values => {
            if (values.id === imageId) {
              values.comments = commentLength
            }
          })

          this.data.filter((media) => {
            if (media.id === imageId) {
              media.comments = commentLength
            }
          })
        }
      })
    )

    this.onDeleteCommentsSubscription = <Subscription>(
      this.api.OnDeleteCommentsListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onDeleteComments.imagePostsID;
          let commentsArray: [] = await this.api.getImageComments(imageId)
          let commentLength: string = commentsArray.length.toString()

          await this.api.UpdateImagePost({id: imageId, comments: commentLength})

          let timelineData = await this.api.ListImagePosts();

          timelineData.items.map(values => {
            if(values.id === imageId){
              values.comments = commentLength
            }
          })

          this.data.filter(values => {
            if(values.id === imageId){
              values.comments = commentLength
            }
          })
        }
      })
    )
  }

  async commentLength(imageID) {
    let commentArray: [] = await this.api.getImageComments(imageID)
    return commentArray.length
  }

}

import { Component, OnInit, ViewChild, Input, QueryList, ViewChildren, ElementRef, Renderer2} from '@angular/core';
import { ModalController, Platform, ViewDidEnter, IonInfiniteScroll, IonRefresher, IonRefresherContent, ViewDidLeave, } from '@ionic/angular';
import { MediaService } from 'src/app/services/media.service';
import { FA, ModelSortDirection } from "../../FA.service";
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CommentModalPage } from '../../modals/comment-modal/comment-modal.page';
import { LikeListModalPage } from '../../modals/like-list-modal/like-list-modal.page';
import { EditMediaModalPage } from 'src/app/modals/edit-media-modal/edit-media-modal.page';
import { Storage } from '@aws-amplify/storage';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { IonItemSliding} from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';

import { DateAsAgoPipe } from 'src/app/pipes/date-as-ago.pipe';
import { DateAsAgoShortPipe } from 'src/app/pipes/date-as-ago-short.pipe';
import { DateSuffixPipe } from 'src/app/pipes/date-suffix.pipe';

import SwiperCore, { Zoom, EffectFade } from 'swiper';
SwiperCore.use([Zoom, EffectFade]);

import { APIService } from 'src/app/API.service';
import { Hub } from 'aws-amplify';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [DateAsAgoPipe, DateAsAgoShortPipe, DateSuffixPipe]
})

export class TimelineComponent implements ViewDidEnter, ViewDidLeave {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher: IonRefresher;
  @ViewChild(IonContent) ionContent: IonContent;
  @Input('data') data = [];
  @Input('token') nextToken: string;
  @Input('liked') liked: any;
  @ViewChildren('timelineVideo') videos: QueryList<any>
  @ViewChildren('timelineVideo', { read: ElementRef})
  timelineVideo!: QueryList<ElementRef<any>>

  nowPlaying = null;
  isPlaying;
  videoOver = false;
  muted = true;
  replay = false;
  routeSub;

  onCreateImageSubscription: Subscription | null = null;
  onUpdateImageSubscription: Subscription | null = null;
  onDeleteImageSubscription: Subscription | null = null;
  onCreateCommentsSubscription: Subscription | null = null;
  onDeleteCommentsSubscription: Subscription | null = null;
  onCreateLikesSubscription: Subscription | null = null;
  onDeleteLikesSubscription: Subscription | null = null;

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  onUpdateAtBatIndex: Subscription | null = null;

  alreadyLiked: boolean;
  loaded: boolean;
  profileSearch: boolean;
  refresh: boolean;
  
  browser: any;
  dataReturned: any;
  wallListLength: any;
  currentUserUsername: any;
  currentUserUsernameID: any;
  pause: any;
  videoStyle: any;
  platformView: any;
  mobilePlatform: any;
  commentArray: any;
  version: any;
  counter_init: any;
  counter_end: any;
  networkStatus: any;
  
  currentUserEditPost = false;
  showFabButton = false;
  scrollFinished = false;
  disableButtons = false;
  
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public fa: FA,
    private loadingController: LoadingController,
    public modalController: ModalController,
    private mediaService: MediaService,
    public navController: NavController,
    private platform: Platform,
    public toastController: ToastController,
    private router: Router,
    private renderer: Renderer2,
    private api: APIService,
    private location: Location
  ) {
    this.mobilePlatform = this.platform.is("mobile");
  }


  async ionViewDidEnter() {

    // if navigate to new page, stop playing current video
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.nowPlaying) {
          this.nowPlaying.pause();
        }
      }
    })

  }

  async ngAfterViewInit() {
    this.didScroll();
    this.startSubscriptions();
    this.currentUserUsernameID = localStorage.getItem('usernameID');
    this.currentUserUsername = localStorage.getItem('username');
    this.browser = localStorage.getItem('User-browser');
    this.platformView = this.platform.platforms();
  }

// Video player functions

  didScroll() {
    if (this.nowPlaying && this.isElementInViewport(this.nowPlaying)) return;
    else if (this.nowPlaying && !this.isElementInViewport(this.nowPlaying)) {
      this.nowPlaying.pause();
      this.nowPlaying = null;
      this.pause = true;
      this.replay = false;
    }

    this.videos.forEach(player => {
      if (this.nowPlaying) return;
      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if (inView) {
        this.nowPlaying = nativeElement;
        this.nowPlaying.muted = true;
        let playPromise = this.nowPlaying.play();

        if (playPromise !== undefined) {
          playPromise.then(_ => {
            this.nowPlaying.play();
          })
            .catch(error => {
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

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
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

  // TOASTS


  // toast messages
  
  async seeNewPostsButton() {
    this.mediaService.getTimelineData().pipe(
      finalize(() => {
        this.loaded = true;
      })
    ).subscribe(async data => {
      console.log(data[0].data)
      this.data = data[0].data;
      this.nextToken = data[0].nextToken;
      this.refresh = false;
      this.scrollFinished = false;
      await this.changeLocation();
      this.showFabButton = false;
    })
    this.showFabButton = false;
  }

  async presentToastNewPost() {
    this.showFabButton = true;
  }

  async presentToastDeletePost() {
    const toast = await this.toastController.create({
      message: 'Your post has been successfully deleted.',
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  async presentToastDeleteComment() {
    const toast = await this.toastController.create({
      message: 'Your comment has been successfully deleted.',
      duration: 2000,
      position: "top",
      color: "success"
    });
    toast.present();
  }

  openPostSettings(username){
    if(this.currentUserUsername === username){
      this.currentUserEditPost = true;
    }
  }

  // This is for editing and sharing posts on wall

  async clickEditPost(mediaUrl, mediaId) {
    let mediaData: any;

    await this.fa.GetImagePost(mediaId).then((data) => {
      if(data.mediaSourceDesktop && data.mediaSourceMobile){
        mediaData = [data];
      } else if (!data.mediaSourceDesktop && !data.mediaSourceMobile){
        mediaData = [data, {
          videoContent: "https://d2glij88atjbas.cloudfront.net/public/" + data.s3_key
        }]
      }
    })

    const modal = await this.modalController.create({
      component: EditMediaModalPage,
      componentProps: {
        mediaData: mediaData
      }
    })

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

  async presentActionSheet(username, mediaId, mediaKey, downloadableVideo, isVideo) {
    if(this.currentUserUsername === username.username){
      this.currentUserEditPost = true;
      const actionSheet = await this.actionSheetController.create({
        header: 'Post Settings',
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
              header: 'Delete Post',
              message: 'Are you sure you want to delete this post?',
              buttons: [
                {
                  text: 'No',
                },
                {
                  text: 'Delete',
                  handler: async () => {

                    await this.fa.DeleteImagePost({id: mediaId})

                    if(isVideo){
                      await Storage.remove(downloadableVideo, { bucket: "fetadevvodservice-dev-input-nk0sepbg" })
                    } else {
                      await Storage.remove(mediaKey)
                    }
                    await this.presentToastDeletePost();
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

            let media = await this.fa.GetImagePost(mediaId)
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

    let media = await this.fa.GetImagePost(id)
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


  // modal functions

  async openCommentModal(id) {
    const modal = await this.modalController.create({
      component: CommentModalPage,
      componentProps: {
        imageID: id
      }
    });

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
        if(this.nextToken !== null){
          this.fa.ImagePostsBySorterValueAndTime_posted("media", null, ModelSortDirection.DESC, null, 4, this.nextToken).then((data) => {
            let dataPull = data.items;
            this.nextToken = data.nextToken;
    
            Object.entries(dataPull).forEach(([key, value]) => { this.data[this.data.length] = value })
            event.target.complete();
          })
        } else {
            this.refresh = false;
            this.scrollFinished = true;
            event.target.complete();
        }
      } catch (error) {
        console.log(error)
      }

  }

  async changeLocation(){
    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/timeline', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]) // navigate to same route
    }); 

    this.refresh = false;
  }

  

  async scrollToTop(){
    if (this.platform.is('hybrid')) {
      await Haptics.impact({ style: ImpactStyle.Heavy })
    }

    this.ionContent.scrollToTop(100).then(() => {
      this.refresh = true;

      this.mediaService.getTimelineData().pipe(
        finalize(() => {
          this.loaded = true;
        })
      ).subscribe(async data => {
        console.log(data[0].data)
        this.data = data[0].data;
        this.nextToken = data[0].nextToken;
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
      this.fa.OnCreateImagePostListener().subscribe(async (event: any) => {
        this.presentToastNewPost();
      })
    );

    this.onUpdateImageSubscription = <Subscription>(
      this.fa.OnUpdateImagePostListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onUpdateImagePost.id;
  
          this.data.filter((media) => {
            if(media.id === imageId){
              media.description = event.value.data.onUpdateImagePost.description;
            }
          })
        }
      })
    )

    this.onDeleteImageSubscription = <Subscription>(
      this.fa.OnDeleteImagePostListener().subscribe((event: any) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
    )

    this.onCreateCommentsSubscription = <Subscription>(
      this.fa.OnCreateCommentsListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onCreateComments.imagePostsID;
          let commentsArray: any = await this.api.CommentsBySorterValueAndTime_posted(imageId + "-comment", null, ModelSortDirection.DESC).then((data) => data)

          this.data.filter(values => {
            if (values.id === imageId) {
              values.comments = commentsArray;
            }
          })
        }
      })
    )

    this.onDeleteCommentsSubscription = <Subscription>(
      this.fa.OnDeleteCommentsListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onDeleteComments.imagePostsID;
          let commentsArray: any = await this.api.CommentsBySorterValueAndTime_posted(imageId + "-comment", null, ModelSortDirection.DESC).then((data) => data)

          this.data.filter(values => {
            if (values.id === imageId) {
              values.comments = commentsArray;
            }
          })
        }
      })
    )

    this.onCreateLikesSubscription = <Subscription>(
      this.api.OnCreateLikesListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onCreateLikes.imagePostsID;
          let likesList: any = await this.api.ListLikes({imagePostsID: {eq: imageId} }).then((data) => data)

          this.data.filter(values => {
            if (values.id === imageId){
              values.likes = likesList
            }
          })
        }
      })
    )

    this.onDeleteLikesSubscription = <Subscription>(
      this.api.OnDeleteLikesListener().subscribe({
        next: async (event: any) => {
          const imageId = event.value.data.onDeleteLikes.imagePostsID;
          let likesList: any = await this.api.ListLikes({ imagePostsID: { eq: imageId } }).then((data) => data)


          if(likesList){
            this.data.filter(values => {
              if (values.id === imageId) {
                values.likes = likesList
              }
            })
          } else {
            this.data.filter(values => {
              if (values.id === imageId) {
                values.likes = []
              }
            })
          }

        }
      })
    )
  }

  async ionViewDidLeave() {
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
    if (this.onCreateLikesSubscription) {
      await this.onCreateLikesSubscription.unsubscribe();
    }
    if (this.onDeleteLikesSubscription) {
      await this.onDeleteLikesSubscription.unsubscribe();
    }
    this.platform.pause.subscribe(async () => {
      console.log('pausing subscription')
    });
  }

}

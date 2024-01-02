import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { MediaService } from 'src/app/services/media.service';
import { ModalController, IonTextarea, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.page.html',
  styleUrls: ['./comment-modal.page.scss'],
})
export class CommentModalPage implements OnInit {

  @ViewChild('editCommentInput') editCommentInput: IonTextarea;

  currentUserUsername;
  currentUserProfilePicture;
  imageID;
  noInput;
  editComment;
  public commentArray: any = [];
  public comments: any = [];
  public postDetails: any = [];
  userNameID: any;
  spinner: boolean;

  postCommentForm = {} as FormGroup;
  writeCommentForm = {} as FormGroup;
  updateCommentForm = {} as FormGroup;
  replyCommentForm = {} as FormGroup;

  onCreateCommentsSubscription: Subscription | null = null;
  onUpdateCommentsSubscription: Subscription | null = null;
  onDeleteCommentsSubscription: Subscription | null = null;

  constructor(
    private api: APIService,
    private mediaService: MediaService,
    private modalController: ModalController,
    private platform: Platform,
    private toastController: ToastController
  ) { 
    this.updateCommentForm = new FormGroup({
      comment: new FormControl('')
    }),
    this.writeCommentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    }),
    this.replyCommentForm = new FormGroup({
      reply: new FormControl('', Validators.required)
    })
  }


  get f() {
    return this.postCommentForm.controls;
  }

  async ngOnInit() {
    this.spinner = true;
    let currentUser = await this.api.GetProfile(localStorage.getItem('profileID'))
    this.currentUserUsername = localStorage.getItem('username');
    this.currentUserProfilePicture = await this.mediaService.checkForProfilePhoto(currentUser.profilepicture);
    let imageDetails = await this.api.GetImagePost(this.imageID);
    this.userNameID = localStorage.getItem('usernameID')

    this.postDetails = {
      id: imageDetails.id,
      description: imageDetails.description,
      time_posted: imageDetails.time_posted,
      likes: await this.mediaService.getLikeCount(imageDetails.likes),
      username: await (await this.api.GetUsername(imageDetails.usernameID)).username,
      profilePicture: await this.mediaService.checkForProfilePhoto(imageDetails.profile.profilepicture)
    }

    this.comments = await this.api.getImageComments(this.imageID)

    this.spinner = false;

    this.onCreateCommentsSubscription = <Subscription>(
      this.api.OnCreateCommentsListener().subscribe({
        next: async (event: any) => {
          this.comments = await this.api.getImageComments(this.imageID)
        }
      })
    )

    this.onUpdateCommentsSubscription = <Subscription>(
      this.api.OnUpdateCommentsListener().subscribe({
        next: async (event: any) => {
          this.comments = await this.api.getImageComments(this.imageID)
        }
      })
    )

    this.onDeleteCommentsSubscription = <Subscription>(
      this.api.OnDeleteCommentsListener().subscribe({
        next: async (event: any) => {
          this.comments = await this.api.getImageComments(this.imageID)
        }
      })
    )
  }

  async postWrittenComment(imagepost) {

    // let userComment = imagepost.comment;
    // let time_posted = new Date().toISOString()
    // let comments = await this.api.getImageComments(this.imageID).then(image => image)

    // if (!comments) {
    //   try {
    //     const result = await this.createComment(userComment, time_posted).then(() => console.log('success'))
    //     this.writeCommentForm.reset();
    //   } catch (error) {
    //     this.failureCallback(error)
    //   }

    // } else {
    //   try {
    //     const result = this.createComment(userComment, time_posted).then(() => console.log('success'))
    //     this.writeCommentForm.reset();
    //   } catch (error) {
    //     this.failureCallback(error)
    //   }
    // }
  }

  createComment(userComment, time_posted) {
    // return new Promise(async (resolve, reject) =>
    //   // resolve(await this.api.CreateComments({ usernameID: localStorage.getItem('usernameID'), comment: userComment, time_posted: time_posted, imagePostsID: this.imageID }))
    // )
  }

  async updateComment(id, editSlider, comment) {
    localStorage.setItem('commentID', id)
    editSlider.close();
    this.updateCommentForm.controls['comment'].setValue(comment);

    if (this.platform.is('hybrid')) {
      setTimeout(() => {
        this.editCommentInput.setFocus();
      }, 500)
    }

    this.noInput = false;
    this.editComment = true;
  }

  async postUpdatedComment(value) {
    await this.api.UpdateComments({ id: localStorage.getItem('commentID'), comment: value.comment})
    localStorage.removeItem('commentID')
    this.noInput = false;
    this.editComment = false;
  }

  async deleteComment(id) {
    await this.api.DeleteComments({ id: id})
    this.presentDeleteComment();
  }

  async presentDeleteComment() {
    const toast = await this.toastController.create({
      message: 'Your comment has been deleted.',
      position: 'top',
      duration: 2000,
      keyboardClose: true,
      color: 'success'
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  failureCallback(error) {
    console.error("Error generating comment: " + error);
  }

  async backToTimeline() {
    this.modalController.dismiss({
      'dismissed': true,
      'formStatus': 'markAsUntouched',
      'noInput': true
    });
  }

  async closeModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'formStatus': 'markAsUntouched',
      'noInput': true
    });
  }

  async ngOnDestroy() {
    if (this.onCreateCommentsSubscription) {
      await this.onCreateCommentsSubscription.unsubscribe();
    }
    if (this.onUpdateCommentsSubscription) {
      await this.onUpdateCommentsSubscription.unsubscribe();
    }
    if (this.onDeleteCommentsSubscription) {
      await this.onDeleteCommentsSubscription.unsubscribe();
    }
    this.platform.pause.subscribe(async () => {
      console.log('pausing subscription')
    });
  }

}

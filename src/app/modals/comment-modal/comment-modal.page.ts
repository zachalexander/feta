import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService, ModelSortDirection } from 'src/app/API.service';
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
  profilePictureUrl: string;
  currentUserProfilePicture: string;
  imageID;
  noInput;
  editComment;
  public commentArray: any = [];
  public comments: any = [];
  public postDetails: any = [];
  userNameID: any;
  spinner: boolean;
  nextToken;
  scrollFinished;
  refresh;

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
    this.currentUserProfilePicture = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + currentUser.profilepicture.imageurl;
    let imageDetails = await this.api.GetImagePost(this.imageID);
    this.userNameID = localStorage.getItem('usernameID')
    let profilePictureData = await this.api.GetProfilePictureProfileID(imageDetails.profile.id)
    if (profilePictureData) {
      this.profilePictureUrl = "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + profilePictureData.imageurl;
    } else {
      this.profilePictureUrl = "../../../assets/avatar.svg";
    }

    this.postDetails = {
      id: imageDetails.id,
      description: imageDetails.description,
      time_posted: imageDetails.time_posted,
      username: await (await this.api.GetUsername(imageDetails.usernameID)).username,
      profilePicture: this.profilePictureUrl
    }

    let comments = await this.api.CommentsBySorterValueAndTime_posted(this.imageID + "-comment", null, ModelSortDirection.DESC, null, 20).then((data) => data)
    this.comments = comments.items;
    this.nextToken = comments.nextToken;
    console.log(this.comments, this.nextToken)

    this.spinner = false;

    this.onCreateCommentsSubscription = <Subscription>(
      this.api.OnCreateCommentsListener().subscribe({
        next: async (event: any) => {
          let comments = await this.api.CommentsBySorterValueAndTime_posted(this.imageID + "-comment", null, ModelSortDirection.DESC).then((data) => data)
          this.comments = comments.items;
        }
      })
    )

    this.onUpdateCommentsSubscription = <Subscription>(
      this.api.OnUpdateCommentsListener().subscribe({
        next: async (event: any) => {
          let comments = await this.api.CommentsBySorterValueAndTime_posted(this.imageID + "-comment", null, ModelSortDirection.DESC).then((data) => data)
          this.comments = comments.items;
        }
      })
    )

    this.onDeleteCommentsSubscription = <Subscription>(
      this.api.OnDeleteCommentsListener().subscribe({
        next: async (event: any) => {
          let comments = await this.api.CommentsBySorterValueAndTime_posted(this.imageID + "-comment", null, ModelSortDirection.DESC).then((data) => data)
          this.comments = comments.items;
        }
      })
    )
  }

  async postWrittenComment(imagepost) {
    let userComment = imagepost.comment;
    let time_posted = new Date().toISOString()

    try {
      await this.api.CreateComments({ "usernameID": localStorage.getItem("usernameID"), "profileID": localStorage.getItem("profileID"), "comment": userComment, "time_posted": time_posted, "imagePostsID": this.imageID, "sorterValue": this.imageID + "-comment"}).then(() => console.log('success'))
      this.writeCommentForm.reset();
    } catch (error) {
      this.failureCallback(error)
    }
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
    await this.api.DeleteComments({id: id})
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


  async loadData(event) {
    try {
      if (this.nextToken !== null) {
        this.api.CommentsBySorterValueAndTime_posted(this.imageID + "-comment", null, ModelSortDirection.DESC, null, 20, this.nextToken).then((data) => {
          console.log(data)
          let dataPull = data.items;
          this.nextToken = data.nextToken;

          Object.entries(dataPull).forEach(([key, value]) => { this.comments[this.comments.length] = value })
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

}

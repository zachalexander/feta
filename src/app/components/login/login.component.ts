import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './../../../aws-exports';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  clicked = false;

  constructor(public authenticator: AuthenticatorService, private router: Router, public loadingController: LoadingController) { 
    Amplify.configure(awsExports);
  }

  ngOnInit() {
    this.authenticator.subscribe((status) => {
      const { route } = this.authenticator;

      if(route == 'authenticated' && status.user.username){
        this.loadingSpinner();
        localStorage.setItem('cognitoID', status.user.username)
        this.router.navigate(['/home'])
      }
    })
  }

  async loadingSpinner(){
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp-small',
      duration: 2000,
      translucent: false,
      cssClass: 'spinner-loading'
    });
    await loading.present();
  }

  async signOut(){
    const currentUser = await Auth.currentUserPoolUser();
    await currentUser.signOut()
    await localStorage.clear()
    await this.router.navigate(['/login']).then(() => { window.location.reload()})
  }

}

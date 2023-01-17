import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {APIService, Profile } from "../API.service";

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  usernames: any;
  duplicate: any;

  constructor(private api: APIService){}

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  async userNameValidator(userControl: AbstractControl) {
    let test = new Promise(resolve => {
      setTimeout(async () => {
        if(await this.validateUserName(userControl.value)) {
          resolve({ userNameValidator: true})
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return await this.returnResolve(test)
  }

  async returnResolve(errorValue: object): Promise<any> {
    return errorValue;
  }

  async validateUserName(userName: string): Promise<any> {
    var UserList = await this.getListOfProfiles()
    if(!localStorage.getItem('profileID')){
      return false;
    } else {
      let profile = await this.api.GetProfile(localStorage.getItem('profileID'));
  
      if(profile){
        let username = await this.api.GetUsernameFromProfileId(profile.id);
  
        if(username !== userName){
          return (UserList.indexOf(userName) > -1)
        } else {
          return false;
        }
      }
      return (UserList.indexOf(userName) > -1)
    }



  }

  getListOfProfiles(): Promise<any> {
    var UserList = new Array();
    return this.api.ListUsernames().then(async event => {
      this.usernames = event.items;
      this.usernames.forEach(username => {
        UserList.push(username.username)
      })
      return UserList;
    })
  }
}

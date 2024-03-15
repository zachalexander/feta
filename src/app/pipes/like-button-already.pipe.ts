import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likeButtonAlready'
})
export class LikeButtonAlreadyPipe implements PipeTransform {

  transform(value: any, currentUsernameID: any): any {
    
    let boolCheck;
    value.items.map((likes) => {
      if(likes.usernameID === currentUsernameID){
        boolCheck = true;
      } else {
        boolCheck = false;
      }
    })
    return boolCheck;
  }

}

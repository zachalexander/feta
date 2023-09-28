import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseballChatroomPage } from './baseball-chatroom.page';

const routes: Routes = [
  {
    path: '',
    component: BaseballChatroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseballChatroomPageRoutingModule {}

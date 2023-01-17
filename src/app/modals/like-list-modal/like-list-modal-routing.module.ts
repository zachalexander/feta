import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikeListModalPage } from './like-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LikeListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikeListModalPageRoutingModule {}

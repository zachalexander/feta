import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListModalPage } from './users-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsersListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListModalPageRoutingModule {}

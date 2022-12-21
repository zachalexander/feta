import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileMenuModalPage } from './profile-menu-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMenuModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMenuModalPageRoutingModule {}

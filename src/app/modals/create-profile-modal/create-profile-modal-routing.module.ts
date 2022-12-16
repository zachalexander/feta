import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProfileModalPage } from './create-profile-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProfileModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProfileModalPageRoutingModule {}

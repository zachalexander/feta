import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMediaModalPage } from './create-media-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMediaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMediaModalPageRoutingModule {}

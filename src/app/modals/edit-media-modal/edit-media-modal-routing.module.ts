import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMediaModalPage } from './edit-media-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditMediaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMediaModalPageRoutingModule {}

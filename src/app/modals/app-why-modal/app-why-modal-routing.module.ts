import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppWhyModalPage } from './app-why-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AppWhyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppWhyModalPageRoutingModule {}

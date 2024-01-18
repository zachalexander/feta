import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsOfServiceModalPage } from './terms-of-service-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TermsOfServiceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsOfServiceModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRulesModalPage } from './app-rules-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AppRulesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRulesModalPageRoutingModule {}

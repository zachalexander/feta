import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedmodulePage } from './sharedmodule.page';

const routes: Routes = [
  {
    path: '',
    component: SharedmodulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedmodulePageRoutingModule {}

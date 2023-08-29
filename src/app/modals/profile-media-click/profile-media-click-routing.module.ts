import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileMediaClickPage } from './profile-media-click.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMediaClickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMediaClickPageRoutingModule {}

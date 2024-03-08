import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePicturePage } from '../profile-picture/profile-picture.page';
import { AuthguardGuard } from '../../shared/authguard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthguardGuard]
      },
      {
        path: 'timeline',
        loadChildren: () => import('../timeline/timeline.module').then(m => m.TimelinePageModule),
        canActivate: [AuthguardGuard]
      },
      {
        path: 'message-board',
        loadChildren: () => import('../message-board/message-board.module').then(m => m.MessageBoardPageModule),
        canActivate: [AuthguardGuard]
      },
      {
        path: 'profile/:username',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthguardGuard]
      },
      {
        path: 'profile-picture',
        component: ProfilePicturePage,
        canActivate: [AuthguardGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}

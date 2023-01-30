import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { ProfilePicturePage } from '../profile-picture/profile-picture.page';
import { AuthguardGuard } from '../../shared/authguard.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthguardGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent, 
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}

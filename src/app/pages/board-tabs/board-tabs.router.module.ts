import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardTabsPage } from './board-tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/goals',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: BoardTabsPage,
    children: [
      {
        path: 'goals',
        children: [
          {
            path: '',
            loadChildren: './tabs/board-goals/board-goals.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: './tabs/tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: './tabs/board-settings/board-settings.module#BoardSettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/goals',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BoardTabsPageRoutingModule {}

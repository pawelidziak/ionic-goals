import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'boards',
    loadChildren: './board-list/board-list.module#BoardListPageModule'
  },
  {
    path: 'board/:boardId',
    loadChildren: './board-tabs/board-tabs.module#BoardTabsPageModule'
  },
  {
    path: 'new-board',
    loadChildren: './new-board/new-board.module#NewBoardPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoardTabsPageRoutingModule } from './board-tabs.router.module';

import { BoardTabsPage } from './board-tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BoardTabsPageRoutingModule
  ],
  declarations: [BoardTabsPage]
})
export class BoardTabsPageModule {}

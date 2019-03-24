import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BoardSettingsPage} from './board-settings.page';
import {GoalEditComponent} from './goal-edit/goal-edit.component';
import {BoardEditComponent} from './board-edit/board-edit.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: BoardSettingsPage}])
  ],
  declarations: [BoardSettingsPage, GoalEditComponent, BoardEditComponent],
  entryComponents: [GoalEditComponent, BoardEditComponent]
})
export class BoardSettingsPageModule {
}

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Board} from '@core/models/Board';
import {BoardService} from '@core/services/board.service';
import {ModalController} from '@ionic/angular';
import {GoalEditComponent} from './goal-edit/goal-edit.component';
import {OverlayEventDetail} from '@ionic/core';
import {Goal} from '@core/models/Goal';
import {BoardEditComponent} from './board-edit/board-edit.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'board-settings.page.html',
  styleUrls: ['board-settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSettingsPage implements OnInit, OnDestroy {
  currentBoard: Board;
  startDate: Date;

  constructor(private boardService: BoardService,
              private modalController: ModalController) {
    window.addEventListener('beforeunload', () => {
      // TODO save progress to server
      console.log('destr')
    });
  }

  ngOnInit(): void {
    this.boardService.getCurrentBoard().subscribe(
      (res: Board) => {
        this.currentBoard = res;
        this.startDate = new Date(this.currentBoard.startDate);
      },
      error => console.error(error));
  }

  ngOnDestroy(): void {
    // TODO save progress to server
    console.log('destr')
  }

  async openNewGoalModal(goal?: Goal) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: GoalEditComponent,
      componentProps: {goal: goal}
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data) {
        console.log(detail.data);
        // this.addNewGoal(detail.data);
        // this.changeDetector.markForCheck()
      }
    });
    return await modal.present();
  }

  async openBoardModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: BoardEditComponent,
      componentProps: {board: this.currentBoard}
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data) {
        console.log(detail.data);
        // this.addNewGoal(detail.data);
        // this.changeDetector.markForCheck()
      }
    });
    return await modal.present();
  }
}

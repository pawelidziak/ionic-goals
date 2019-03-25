import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
              private changeDetector: ChangeDetectorRef,
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

  /**
   *    GOAL MODAL
   */
  async openGoalModal(goal?: Goal) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: GoalEditComponent,
      componentProps: {
        goal: goal ? goal : this.createEmptyGoal(),
        isNew: !goal
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data) {
        this.addOrEditGoal(detail.data);
        this.changeDetector.markForCheck()
      }
    });
    return await modal.present();
  }

  private addOrEditGoal(goal: Goal): void {
    const index = this.currentBoard.goals.findIndex(x => x.number === goal.number);
    if (index !== -1) {
      this.currentBoard.goals[index] = goal;
    } else {
      this.currentBoard.goals.push(goal);
    }
  }

  private createEmptyGoal(): Goal {
    return {
      name: '',
      description: '',
      number: this.currentBoard.goals.length + 1
    };
  }

  /**
   *    BOARD MODAL
   */
  async openBoardModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: BoardEditComponent,
      componentProps: {board: this.currentBoard}
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail && detail.data) {
        this.assignBoardData(detail.data);
        this.changeDetector.markForCheck()
      }
    });
    return await modal.present();
  }

  private assignBoardData(data: Board): void {
    this.currentBoard.title = data.title;
    this.currentBoard.description = data.description;
    this.currentBoard.color = data.color;
  }
}

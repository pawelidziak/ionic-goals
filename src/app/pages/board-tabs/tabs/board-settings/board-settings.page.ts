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
export class BoardSettingsPage implements OnInit {
  currentBoard: Board;

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
        this.changeDetector.markForCheck();
      },
      error => console.error(error));
  }

  ionViewWillLeave() {
    this.boardService.updateBoard(this.currentBoard);
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
        // convert freq array to one string
        detail.data.frequency = detail.data.frequency.join('');
        this.addOrEditGoal(detail.data);
        this.changeDetector.markForCheck();
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
    const tmp = this.currentBoard.goals;
    this.currentBoard.goals = [...tmp];
  }

  private createEmptyGoal(): Goal {
    return {
      name: '',
      description: '',
      number: this.currentBoard.goals.length + 1,
      frequency: '1234567'
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

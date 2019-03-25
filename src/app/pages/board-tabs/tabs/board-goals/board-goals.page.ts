import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from '@core/services/board.service';
import {Board} from '@core/models/Board';
import {Goal} from '@core/models/Goal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'board-goals.page.html',
  styleUrls: ['board-goals.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGoalsPage implements OnInit, OnDestroy {
  currentBoard: Board;
  nowDate: Date = new Date();
  startDate: Date;
  goalsTodo: Goal[] = [];
  goalsDone: Goal[] = [];
  goalsFailed: Goal[] = [];

  constructor(private boardService: BoardService) {
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
        this.assignGoals();
      },
      error => console.error(error));
  }

  ngOnDestroy(): void {
    // TODO save progress to server
    console.log('destr')
  }

  goalDone(goal: Goal): void {
    this.removeFromList(goal, this.goalsTodo);
    this.goalsDone.push(goal);
    BoardGoalsPage.sortList(this.goalsDone);
  }

  goalFailed(goal: Goal): void {
    this.removeFromList(goal, this.goalsTodo);
    this.goalsFailed.push(goal);
    BoardGoalsPage.sortList(this.goalsFailed);
  }

  undoToTodo(goal: Goal): void {
    this.removeFromList(goal, this.goalsDone);
    this.removeFromList(goal, this.goalsFailed);
    this.goalsTodo.push(goal);
    BoardGoalsPage.sortList(this.goalsTodo);
  }

  private removeFromList(goal: Goal, list: Goal[]): void {
    const index = list.findIndex(x => x.number === goal.number);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  private static sortList(list: Goal[]): void {
    list.sort((a, b) => a.number > b.number ? 1 : -1);
  }

  private assignGoals(): void {
    for (const goal of this.currentBoard.goals) {
      if (goal.frequency.includes(this.nowDate.getDay())) {
        this.goalsTodo.push(goal);
      }
    }
  }
}

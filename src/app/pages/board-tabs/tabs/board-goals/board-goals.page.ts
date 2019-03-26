import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BoardService} from '@core/services/board.service';
import {Board} from '@core/models/Board';
import {Goal} from '@core/models/Goal';
import {Progress} from '@core/models/Progress';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'board-goals.page.html',
  styleUrls: ['board-goals.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGoalsPage implements OnInit {
  private origTodo: Goal[];
  currentBoard: Board;
  nowDate: Date = new Date();
  todayProgress: Progress;

  constructor(private route: ActivatedRoute,
              private boardService: BoardService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.boardService.getCurrentBoard()
      .subscribe((board: Board) => {
        this.currentBoard = board;
        this.checkProgress();
      });
  }

  private checkProgress(): void {
    this.boardService.getProgress().subscribe((progress: Progress) => {
      if(!progress){
        this.boardService.createProgress(this.currentBoard);
      }
      this.todayProgress = progress;
      this.origTodo = this.todayProgress ? [...this.todayProgress.goalsTodo] : [];
      this.changeDetector.markForCheck();
    });
  }

  ionViewWillLeave() {
    if (this.origTodo.length !== this.todayProgress.goalsTodo.length) {
      this.boardService.saveProgress(this.todayProgress);
    }
  }

  goalDone(goal: Goal): void {
    this.removeFromList(goal, this.todayProgress.goalsTodo);
    this.todayProgress.goalsDone.push(goal);
    BoardGoalsPage.sortList(this.todayProgress.goalsDone);
  }

  goalFailed(goal: Goal): void {
    this.removeFromList(goal, this.todayProgress.goalsTodo);
    this.todayProgress.goalsFailed.push(goal);
    BoardGoalsPage.sortList(this.todayProgress.goalsFailed);
  }

  undoToTodo(goal: Goal): void {
    this.removeFromList(goal, this.todayProgress.goalsDone);
    this.removeFromList(goal, this.todayProgress.goalsFailed);
    this.todayProgress.goalsTodo.push(goal);
    BoardGoalsPage.sortList(this.todayProgress.goalsTodo);
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
}

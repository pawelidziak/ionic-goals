import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CacheUtils} from '../utlis/cache.utils';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map, shareReplay} from 'rxjs/operators';
import {BOARD_COLORS} from '@pages/new-board/boardColors';
import {Progress} from '@core/models/Progress';
import {Board} from '@core/models/Board';
import {Goal} from '@core/models/Goal';

const CACHE_SIZE = 1;
const CURRENT_BOARD = 'current_board';
const CURRENT_PROGRESS = 'current_progress';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardCollection: AngularFirestoreCollection<Board>;
  private currentBoardId: string;

  constructor(db: AngularFirestore) {
    this.boardCollection = db.collection<Board>('boards');
  }

  getBoards(): Observable<Board[]> {
    return this.boardCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  addBoard(board: Board): Promise<any> {
    board.color = BOARD_COLORS[BOARD_COLORS.findIndex(x => x.value === board.color)].hex;
    board.goals = [];
    return this.boardCollection.add(board);
  }

  updateBoard(board: Board): Promise<void> {
    return this.boardCollection.doc(this.currentBoardId).update(board);
  }

  removeBoard(id): Promise<void> {
    return this.boardCollection.doc(id).delete();
  }

  getCurrentBoard(): Observable<Board> {
    return CacheUtils.get(CURRENT_BOARD);
  }

  setBoardToCache(id: string) {
    if (this.currentBoardId !== id || !CacheUtils.get(CURRENT_BOARD)) {
      this.currentBoardId = id;
      CacheUtils.clear(CURRENT_PROGRESS);
      CacheUtils.set(CURRENT_BOARD, this.requestGetBoardById(id).pipe(shareReplay(CACHE_SIZE)));
    }
  }

  private requestGetBoardById(id: string): Observable<Board> {
    return this.boardCollection.doc<Board>(id).valueChanges();
  }

  /*
      PROGRESS
   */
  getProgress(): Observable<Progress> {
    if (!CacheUtils.get(CURRENT_PROGRESS)) {
      CacheUtils.set(CURRENT_PROGRESS, this.requestGetProgress().pipe(shareReplay(CACHE_SIZE)));
    }
    return CacheUtils.get(CURRENT_PROGRESS);
  }

  private requestGetProgress(): Observable<Progress> {
    return this.boardCollection
      .doc<Board>(this.currentBoardId)
      .collection('progress')
      .doc<Progress>(this.getDateString())
      .valueChanges();
  }

  saveProgress(todayProgress: Progress) {
    return this.boardCollection
      .doc<Board>(this.currentBoardId)
      .collection('progress')
      .doc<Progress>(this.getDateString())
      .set(todayProgress);
  }

  createProgress(currentBoard: Board) {
    const today = new Date();
    this.saveProgress({
      goalsFailed: [],
      goalsDone: [],
      goalsTodo: currentBoard.goals.filter(goal => goal.frequency.includes(`${today.getDay()}`))
    });
  }

  updateProgress(board: Board) {
    this.getProgress().subscribe((progress: Progress) => {
      if (progress) {
        const today = new Date();
        const allTodayGoals = board.goals.filter(goal => goal.frequency.includes(`${today.getDay()}`));
        // if (allTodayGoals.length === progress.goalsTodo.length + progress.goalsDone.length + progress.goalsFailed.length) {
        //   return
        // }
        for (const goal of allTodayGoals) {
          this.addMissingGoal(progress, goal);
          this.replaceDifferentGoal(progress.goalsTodo, goal);
          this.replaceDifferentGoal(progress.goalsDone, goal);
          this.replaceDifferentGoal(progress.goalsFailed, goal);
        }
        this.saveProgress(progress);
      } else {
        this.createProgress(board);
      }
    });
  }

  private replaceDifferentGoal(list: Goal[], goal: Goal) {
    const index = list.findIndex(x => x.number === goal.number);
    if (index !== -1 && JSON.stringify(list[index]) !== JSON.stringify(goal)) {
      list[index] = goal;
    }
  }

  private addMissingGoal(progress: Progress, goal: Goal) {
    const indexTodo = progress.goalsTodo.findIndex(x => x.number === goal.number);
    const indexDone = progress.goalsDone.findIndex(x => x.number === goal.number);
    const indexFailed = progress.goalsFailed.findIndex(x => x.number === goal.number);
    if (indexTodo === -1 && indexDone === -1 && indexFailed === -1) {
      progress.goalsTodo.push(goal);
    }
  }

  private getDateString(today: Date = new Date()) {
    const mm = today.getMonth() + 1; // getMonth() is zero-based
    const dd = today.getDate();

    return [today.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  }

}

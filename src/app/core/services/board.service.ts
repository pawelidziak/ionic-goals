import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Board} from '../models/Board';
import {CacheUtils} from '../utlis/cache.utils';
import {shareReplay} from 'rxjs/operators';

const CACHE_SIZE = 1;
const CURRENT_BOARD = 'current_board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private currentBoardId: string;

  public getCurrentBoard(): Observable<Board> {
    return CacheUtils.get(CURRENT_BOARD);
  }

  public setBoardToCache(id: string) {
    if (this.currentBoardId !== id || !CacheUtils.get(CURRENT_BOARD)) {
      this.currentBoardId = id;
      CacheUtils.set(CURRENT_BOARD, this.requestGetBoardById(id).pipe(shareReplay(CACHE_SIZE)));
    }
  }

  private requestGetBoardById(id: string): Observable<Board> {
    // TODO get board from server
    const tmpBoard: Board = {
      id: id,
      title: 'TMP board one',
      description: 'Simple tmp description for board one',
      color: 'blue',
      startDate: '2019-03-23',
      goals: [
        {number: 1, name: 'Goal 1', description: 'Goal 1 description'},
        {number: 2, name: 'Goal 2', description: 'Goal 2 description'},
        {number: 3, name: 'Goal 3', description: 'Goal 3 description'}
      ]
    };
    return of(tmpBoard);
  }

  updateBoard(board: Board) {

  }
}

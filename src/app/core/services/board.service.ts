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
        {number: 1, name: 'Siłownia', description: 'Goal 1 description', frequency: [1, 2]},
        {number: 2, name: 'Czytanie', description: 'Goal 2 description', frequency: [1, 2, 3, 4, 5, 6, 7]},
        {number: 3, name: 'Medytacja', description: 'Goal 3 description', frequency: [1, 3, 4]}
      ]
    };
    return of(tmpBoard);
  }

  updateBoard(board: Board) {

  }
}

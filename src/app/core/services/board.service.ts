import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Board} from '../models/Board';
import {CacheUtils} from '../utlis/cache.utils';
import {shareReplay} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {BOARD_COLORS} from '@pages/new-board/boardColors';

const CACHE_SIZE = 1;
const CURRENT_BOARD = 'current_board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private boardCollection: AngularFirestoreCollection<Board>;
  private boards: Observable<Board[]>;
  private currentBoardId: string;

  constructor(db: AngularFirestore) {
    this.boardCollection = db.collection<Board>('boards');
  }

  getBoards() {
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

  addBoard(board: Board) {
    board.color = BOARD_COLORS[BOARD_COLORS.findIndex(x=>x.value === board.color)].hex;
    board.goals = [];
    return this.boardCollection.add(board);
  }

  updateBoard(board: Board) {
    return this.boardCollection.doc(this.currentBoardId).update(board);
  }

  removeBoard(id) {
    return this.boardCollection.doc(id).delete();
  }

  /////////////////////////////

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
    return this.boardCollection.doc<Board>(id).valueChanges();
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Board} from '@core/models/Board';
import {BOARD_COLORS} from '@pages/new-board/boardColors';
import {BoardColor} from '@core/models/BoardColor';
import {BoardService} from '@core/services/board.service';

@Component({
  selector: 'app-list',
  templateUrl: 'board-list.page.html',
  styleUrls: ['board-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListPage implements OnInit {
  colors: BoardColor[] = BOARD_COLORS;
  boards: Board[];

  constructor(private router: Router,
              private changeDetector: ChangeDetectorRef,
              private boardService: BoardService) {

  }

  ngOnInit() {
    this.boardService.getBoards().subscribe(res => {
      this.boards = res;
      this.changeDetector.markForCheck();
    });
  }

  navigateToBoard(board: Board) {
    this.router.navigate([`/board/${board.id}`]);
  }

}

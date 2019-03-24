import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Board} from '@core/models/Board';
import {BOARD_COLORS} from '@pages/new-board/boardColors';
import {BoardColor} from '@core/models/BoardColor';

@Component({
  selector: 'app-list',
  templateUrl: 'board-list.page.html',
  styleUrls: ['board-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListPage implements OnInit {
  colors: BoardColor[] = BOARD_COLORS;
  tmpBoards: Board[] = [];

  constructor(private router: Router) {
    for (let i = 1; i < 7; i++) {
      this.tmpBoards.push(
        {
          id: `${i}`,
          title: 'Board ' + i,
          description: 'This is simple description for Board  #' + i,
          color: this.colors[Math.floor(Math.random() * this.colors.length)].hex,
          startDate: 'Data #' + i
        }
      )
    }
  }

  ngOnInit() {
  }

  navigateToBoard(board: Board) {
    this.router.navigate([`/board/${board.id}`]);
  }

}

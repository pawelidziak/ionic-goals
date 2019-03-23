import {Component, OnInit} from '@angular/core';
import {BoardService} from '../../../../core/services/board.service';
import {Board} from '../../../../core/models/Board';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  currentBoard: Board;
  goalActions = [
    {
      value: 'done',
      icon: 'checkmark-circle'
    },
    {
      value: 'failed',
      icon: 'close-circle'
    }
  ];

  constructor(private boardService: BoardService) {

  }

  ngOnInit(): void {
    this.boardService.getCurrentBoard().subscribe(
      (res: Board) => this.currentBoard = res,
      error => console.error(error));
  }

  favorite(e) {
    console.log('favorite');
    console.log(e);
  }

  unread(e) {
    console.log('unred');
    console.log(e);
  }

  sharer(e) {
    console.log('share');
    console.log(e);
  }
}

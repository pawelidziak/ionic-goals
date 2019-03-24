import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoardService} from '@core/services/board.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'board-tabs.page.html',
  styleUrls: ['board-tabs.page.scss']
})
export class BoardTabsPage implements OnInit {

  constructor(private route: ActivatedRoute, private boardService: BoardService) {
  }

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('boardId');
    this.boardService.setBoardToCache(boardId);
  }
}

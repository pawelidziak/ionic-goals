import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGoalsPage } from './board-goals.page';

describe('BoardGoalsPage', () => {
  let component: BoardGoalsPage;
  let fixture: ComponentFixture<BoardGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardGoalsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

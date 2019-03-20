import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardPage } from './new-board.page';

describe('NewBoardPage', () => {
  let component: NewBoardPage;
  let fixture: ComponentFixture<NewBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBoardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

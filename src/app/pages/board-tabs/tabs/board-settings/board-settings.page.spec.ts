import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSettingsPage } from './board-settings.page';

describe('BoardSettingsPage', () => {
  let component: BoardSettingsPage;
  let fixture: ComponentFixture<BoardSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardSettingsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

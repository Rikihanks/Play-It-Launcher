import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardRecentlyPlayedComponent } from './game-card-recently-played.component';

describe('GameCardRecentlyPlayedComponent', () => {
  let component: GameCardRecentlyPlayedComponent;
  let fixture: ComponentFixture<GameCardRecentlyPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardRecentlyPlayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardRecentlyPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

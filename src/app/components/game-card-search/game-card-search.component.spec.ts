import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardSearchComponent } from './game-card-search.component';

describe('GameCardSearchComponent', () => {
  let component: GameCardSearchComponent;
  let fixture: ComponentFixture<GameCardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardMainComponent } from './game-card-main.component';

describe('GameCardMainComponent', () => {
  let component: GameCardMainComponent;
  let fixture: ComponentFixture<GameCardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

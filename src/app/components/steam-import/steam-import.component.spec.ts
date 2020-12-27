import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamImportComponent } from './steam-import.component';

describe('SteamImportComponent', () => {
  let component: SteamImportComponent;
  let fixture: ComponentFixture<SteamImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

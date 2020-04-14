import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAcceptationComponent } from './tournament-acceptation.component';

describe('TournamentAcceptationComponent', () => {
  let component: TournamentAcceptationComponent;
  let fixture: ComponentFixture<TournamentAcceptationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAcceptationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAcceptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRoundComponent } from './next-round.component';

describe('NextRoundComponent', () => {
  let component: NextRoundComponent;
  let fixture: ComponentFixture<NextRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDateFormComponent } from './match-date-form.component';

describe('MatchDateFormComponent', () => {
  let component: MatchDateFormComponent;
  let fixture: ComponentFixture<MatchDateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

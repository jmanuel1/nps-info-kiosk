import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleListCardComponent } from './title-list-card.component';

describe('ListCardComponent', () => {
  let component: TitleListCardComponent;
  let fixture: ComponentFixture<TitleListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

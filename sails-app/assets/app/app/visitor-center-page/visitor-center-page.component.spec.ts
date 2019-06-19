import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCenterPageComponent } from './visitor-center-page.component';

describe('VisitorCenterPageComponent', () => {
  let component: VisitorCenterPageComponent;
  let fixture: ComponentFixture<VisitorCenterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCenterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

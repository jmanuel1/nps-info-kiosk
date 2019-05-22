import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkResultComponent } from './park-result.component';

describe('ParkResultComponent', () => {
  let component: ParkResultComponent;
  let fixture: ComponentFixture<ParkResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

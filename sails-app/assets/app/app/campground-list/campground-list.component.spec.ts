import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundListComponent } from './campground-list.component';

describe('CampgroundListComponent', () => {
  let component: CampgroundListComponent;
  let fixture: ComponentFixture<CampgroundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

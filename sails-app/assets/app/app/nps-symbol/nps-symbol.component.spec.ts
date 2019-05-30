import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsSymbolComponent } from './nps-symbol.component';

describe('NpsSymbolComponent', () => {
  let component: NpsSymbolComponent;
  let fixture: ComponentFixture<NpsSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

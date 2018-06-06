import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpostAddComponent } from './outpost-add.component';

describe('OutpostAddComponent', () => {
  let component: OutpostAddComponent;
  let fixture: ComponentFixture<OutpostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpostListComponent } from './outpost-list.component';

describe('OutpostListComponent', () => {
  let component: OutpostListComponent;
  let fixture: ComponentFixture<OutpostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutpostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

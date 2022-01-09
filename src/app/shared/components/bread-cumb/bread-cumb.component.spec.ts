import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCumbComponent } from './bread-cumb.component';

describe('BreadCumbComponent', () => {
  let component: BreadCumbComponent;
  let fixture: ComponentFixture<BreadCumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

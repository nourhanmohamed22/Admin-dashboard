import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdialogComponent } from './popdialog.component';

describe('PopdialogComponent', () => {
  let component: PopdialogComponent;
  let fixture: ComponentFixture<PopdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

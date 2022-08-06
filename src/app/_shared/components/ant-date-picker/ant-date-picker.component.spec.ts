import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntDatePickerComponent } from './ant-date-picker.component';

describe('AntDatePickerComponent', () => {
  let component: AntDatePickerComponent;
  let fixture: ComponentFixture<AntDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

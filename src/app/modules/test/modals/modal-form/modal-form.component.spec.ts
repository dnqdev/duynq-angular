import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormComponent } from './modal-form.component';

fdescribe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('fullName')).toBeTruthy();
    expect(component.formGroup.contains('DayOfBirth')).toBeTruthy();
    expect(component.formGroup.contains('gender')).toBeTruthy();
    expect(component.formGroup.contains('classId')).toBeTruthy();
  });
});

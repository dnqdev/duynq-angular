import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUserToRoleComponent } from './modal-add-user-to-role.component';

describe('ModalAssignPermissionComponent', () => {
  let component: ModalAddUserToRoleComponent;
  let fixture: ComponentFixture<ModalAddUserToRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddUserToRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUserToRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignPermissionRoleComponent } from './modal-assign-permission-role.component';

describe('ModalAssignUserRoleComponent', () => {
  let component: ModalAssignPermissionRoleComponent;
  let fixture: ComponentFixture<ModalAssignPermissionRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssignPermissionRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignPermissionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

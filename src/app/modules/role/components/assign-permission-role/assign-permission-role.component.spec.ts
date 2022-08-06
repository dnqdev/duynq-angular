import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionRoleComponent } from './assign-permission-role.component';

describe('AssignPermissionRoleComponent', () => {
  let component: AssignPermissionRoleComponent;
  let fixture: ComponentFixture<AssignPermissionRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPermissionRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPermissionRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

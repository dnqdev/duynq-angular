import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListUsersComponent } from './modal-list-users.component';

describe('ModalListUsersComponent', () => {
  let component: ModalListUsersComponent;
  let fixture: ComponentFixture<ModalListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

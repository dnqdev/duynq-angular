import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPermissionsModuleComponent } from './tab-permissions-module.component';

describe('TabPermissionsModuleComponent', () => {
  let component: TabPermissionsModuleComponent;
  let fixture: ComponentFixture<TabPermissionsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabPermissionsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPermissionsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

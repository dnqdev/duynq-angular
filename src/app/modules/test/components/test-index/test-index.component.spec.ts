import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIndexComponent } from './test-index.component';

describe('TestIndexComponent', () => {
  let component: TestIndexComponent;
  let fixture: ComponentFixture<TestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

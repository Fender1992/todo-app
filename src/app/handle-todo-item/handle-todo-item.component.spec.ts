import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleTodoItemComponent } from './handle-todo-item.component';

describe('HandleTodoItemComponent', () => {
  let component: HandleTodoItemComponent;
  let fixture: ComponentFixture<HandleTodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleTodoItemComponent]
    });
    fixture = TestBed.createComponent(HandleTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

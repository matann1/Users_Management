import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosAndPostComponent } from './todos-and-post.component';

describe('TodosAndPostComponent', () => {
  let component: TodosAndPostComponent;
  let fixture: ComponentFixture<TodosAndPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosAndPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosAndPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

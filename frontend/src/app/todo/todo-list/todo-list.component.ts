import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoCreateComponent } from '../todo-create/todo-create.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoCreateComponent],
  template: `
    <div class="todo-container">
      <div class="todo-header">
        <h2>My Tasks</h2>
        <app-todo-create (createTodo)="onCreateTodo($event)"></app-todo-create>
      </div>

      <div class="todo-list">
        @for (todo of todos; track todo.id) {
        <app-todo-item
          [todo]="todo"
          (toggleTodo)="onToggleTodo($event)"
          (deleteTodo)="onDeleteTodo($event)"
        ></app-todo-item>
        } @empty {
        <div class="empty-state">
          <p>No tasks yet. Click the "Add Todo" button to create one!</p>
        </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onCreateTodo(event: { title: string; body: string }): void {
    this.todoService.addTodo(event.title, event.body);
  }

  onToggleTodo(id: string): void {
    this.todoService.toggleTodo(id);
  }

  onDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }
}

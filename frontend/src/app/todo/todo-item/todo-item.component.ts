import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-item" [class.completed]="todo.completed">
      <div class="todo-content">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="onToggle()"
        />
        <div class="todo-text">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.body }}</p>
        </div>
      </div>
      <button class="delete-btn" (click)="onDelete()">Delete</button>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleTodo = new EventEmitter<string>();
  @Output() deleteTodo = new EventEmitter<string>();

  onToggle(): void {
    this.toggleTodo.emit(this.todo.id);
  }

  onDelete(): void {
    this.deleteTodo.emit(this.todo.id);
  }
}

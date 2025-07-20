import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-create">
      <button class="add-button" (click)="showModal()">
        <span>+</span> Add Todo
      </button>
    </div>

    @if (isModalOpen) {
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Create New Todo</h2>
          <button class="close-button" (click)="closeModal()">×</button>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <input
              type="text"
              [(ngModel)]="title"
              placeholder="Enter todo title..."
              (keyup.enter)="focusTextarea()"
            />
            <textarea
              [(ngModel)]="body"
              placeholder="Enter todo description..."
              rows="3"
              (keyup.ctrl.enter)="onSubmit()"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" (click)="closeModal()">Cancel</button>
          <button class="submit-button" (click)="onSubmit()">Add Todo</button>
        </div>
      </div>
    </div>
    }
  `,
  styleUrls: ['./todo-create.component.scss'],
})
export class TodoCreateComponent {
  title: string = '';
  body: string = '';
  isModalOpen: boolean = false;

  createTodo = output<{ title: string; body: string }>();

  showModal(): void {
    this.isModalOpen = true;
    setTimeout(() => {
      const titleInput = document.querySelector('input') as HTMLInputElement;
      if (titleInput) {
        titleInput.focus();
      }
    }, 100);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.title = '';
    this.body = '';
  }

  focusTextarea(): void {
    if (this.title.trim()) {
      const textarea = document.querySelector(
        'textarea'
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    }
  }

  onSubmit(): void {
    if (this.title.trim()) {
      this.createTodo.emit({
        title: this.title,
        body: this.body,
      });
      this.closeModal();
    }
  }
}

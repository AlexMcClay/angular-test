import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos = this.todosSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedTodos = localStorage.getItem(this.STORAGE_KEY);
    if (storedTodos) {
      this.todosSubject.next(JSON.parse(storedTodos));
    }
  }

  private saveToLocalStorage(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): Observable<Todo[]> {
    return this.todos;
  }

  addTodo(text: string): void {
    const currentTodos = this.todosSubject.value;
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    this.saveToLocalStorage([...currentTodos, newTodo]);
  }

  toggleTodo(id: number): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveToLocalStorage(updatedTodos);
  }

  deleteTodo(id: number): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage(updatedTodos);
  }
}

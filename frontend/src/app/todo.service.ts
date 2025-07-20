import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

export interface Todo {
  id: string;
  title: string;
  body: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly collectionName = 'todos';

  constructor(private firestore: Firestore) {}

  getTodos(): Observable<Todo[]> {
    const todosCollection = collection(this.firestore, this.collectionName);
    return collectionData(todosCollection, { idField: 'id' }).pipe(
      map((docs) => docs as Todo[])
    );
  }

  async addTodo(title: string, body: string): Promise<void> {
    const todosCollection = collection(this.firestore, this.collectionName);
    await addDoc(todosCollection, {
      title: title.trim(),
      body: body.trim(),
      completed: false,
    });
  }

  async toggleTodo(id: string): Promise<void> {
    const todoRef = doc(this.firestore, this.collectionName, id);
    // First get the current todo to toggle its completed status
    const todo = await this.getTodoById(id);
    if (todo) {
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const todoRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(todoRef);
  }

  private async getTodoById(id: string): Promise<Todo | null> {
    const todoRef = doc(this.firestore, this.collectionName, id);
    const snapshot = await getDoc(todoRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return { ...data, id: snapshot.id } as Todo;
    }
    return null;
  }
}

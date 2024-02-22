export class Item {
  id: number = Math.floor(Math.random() * 1000);
  task: string;
  completed: boolean;
  createdAt: Date = new Date();
  firebaseKey?: string;

  constructor(task: string, completed: boolean, firebaseKey?: string) {
    this.task = task;
    this.completed = completed;
    this.firebaseKey = firebaseKey;
  }
}

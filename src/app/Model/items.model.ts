export class Item {
  id: number = Math.floor(Math.random() * 1000);
  task: string;
  completed: boolean;
  createdAt: Date = new Date();
  firebaseKey?: string;
  UUID: string = '';

  constructor(
    task: string,
    completed: boolean,
    firebaseKey?: string,
    UUID: string = ''
  ) {
    this.task = task;
    this.completed = completed;
    this.firebaseKey = firebaseKey;
    this.UUID = UUID;
  }
}

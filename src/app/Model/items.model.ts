export class Item {
  id: number;
  task: string;
  completed: boolean;

  constructor(task: string, completed: boolean, id: number) {
    this.task = task;
    this.completed = completed;
    this.id = id;
  }
}

export class Item {
  public task: string;
  public completed: boolean;

  constructor(task: string, completed: boolean) {
    this.task = task;
    this.completed = completed;
  }
}

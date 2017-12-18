import { observable, computed } from "mobx";

export class AppModel {
  @observable todoInput: string = "";

  @observable filterText: string = "";

  @observable todoList: Todo[] = [];

  addTodo() {
    const todo = new Todo();
    todo.done = false;
    todo.todo = this.todoInput;
    this.todoList.push(todo);
  }

  @computed
  get filteredTodo(): Todo[] {
    return this.todoList.filter(it => it.todo.indexOf(this.filterText) >= 0);
  }

  @computed
  get allCount() {
    return this.todoList.length;
  }

  @computed
  get doneCount() {
    return this.todoList.filter(it => it.done).length;
  }
}

export class Todo {
  @observable todo: string;
  @observable done: boolean = false;
}

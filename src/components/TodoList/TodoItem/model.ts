import { computed } from "mobx";

import { Todo } from "../../../domain/App";
import { TodoItemVM } from "./index";

export class TodoItemVMImpl implements TodoItemVM {
  constructor(readonly todoItem: Todo) {}

  @computed
  get todo() {
    return this.todoItem.todo;
  }

  @computed
  get done() {
    return this.todoItem.done;
  }

  onToggleTodo = () => {
    this.todoItem.done = !this.todoItem.done;
  };
}

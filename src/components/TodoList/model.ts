import { computed } from "mobx";

import { AppModel } from "../../domain/App";
import { TodoListVM } from "./index";
import { TodoItemVMImpl } from "./TodoItem/model";

export class TodoListVMImpl implements TodoListVM {
  constructor(readonly appModel: AppModel) {}

  @computed
  get todos() {
    return this.appModel.filteredTodo.map(it => new TodoItemVMImpl(it));
  }
}

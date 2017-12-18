import { TodoInputVM } from "./index";
import { AppModel } from "../../domain/App";
import { computed } from "mobx";

export class TodoInputVMImpl implements TodoInputVM {
  constructor(readonly appModel: AppModel) {}

  @computed
  get todo() {
    return this.appModel.todoInput;
  }

  onTodoChanged = (todoTitle: string) => {
    this.appModel.todoInput = todoTitle;
  };

  onAddTodo = () => {
    this.appModel.addTodo();
  };
}

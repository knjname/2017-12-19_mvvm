import { AppVM } from "./index";
import { AppModel } from "../../domain/App";
import { TodoCounterVMImpl } from "../TodoCounter/model";
import { TodoFilterVMImpl } from "../TodoFilter/model";
import { TodoListVMImpl } from "../TodoList/model";
import { TodoInputVMImpl } from "../TodoInput/model";

export class AppVMImpl implements AppVM {
  constructor(readonly appModel: AppModel) {}

  todoInputVM = new TodoInputVMImpl(this.appModel);
  todoFilterVM = new TodoFilterVMImpl(this.appModel);
  todoListVM = new TodoListVMImpl(this.appModel);
  todoCounterVM = new TodoCounterVMImpl(this.appModel);
}

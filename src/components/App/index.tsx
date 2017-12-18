import { observer } from "mobx-react";
import * as React from "react";

import { TodoCounter, TodoCounterVM } from "../TodoCounter/index";
import { TodoFilter, TodoFilterVM } from "../TodoFilter/index";
import { TodoInput, TodoInputVM } from "../TodoInput/index";
import { TodoList, TodoListVM } from "../TodoList/index";

export interface AppVM {
  todoInputVM: TodoInputVM;
  todoFilterVM: TodoFilterVM;
  todoListVM: TodoListVM;
  todoCounterVM: TodoCounterVM;
}

export const App = observer((props: { model: AppVM }) => {
  const { todoInputVM, todoFilterVM, todoListVM, todoCounterVM } = props.model;
  return (
    <div>
      <TodoInput model={todoInputVM} />
      <TodoFilter model={todoFilterVM} />
      <TodoList model={todoListVM} />
      <TodoCounter model={todoCounterVM} />
    </div>
  );
});

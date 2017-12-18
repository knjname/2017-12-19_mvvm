import { observer } from "mobx-react";
import * as React from "react";

import { TodoItemVM, TodoItem } from "./TodoItem/index";

export interface TodoListVM {
  todos: TodoItemVM[];
}

export const TodoList = observer((props: { model: TodoListVM }) => {
  const { todos } = props.model;

  // TodoItem に key を指定したほうがいいよ(余裕のある人はやってみよう)
  return <ul>{todos.map(it => <TodoItem model={it} />)}</ul>;
});

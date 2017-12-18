import * as React from "react";
import { observer } from "mobx-react";

export interface TodoItemVM {
  todo: string;
  done: boolean;
  onToggleTodo: () => void;
}

export const TodoItem = observer((props: { model: TodoItemVM }) => {
  const { todo, done, onToggleTodo } = props.model;

  return (
    <li>
      <label>
        <input type="checkbox" checked={done} onChange={() => onToggleTodo()} />
        {todo}
      </label>
    </li>
  );
});

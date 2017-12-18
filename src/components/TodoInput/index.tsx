import * as React from "react";
import { observer } from "mobx-react";

export interface TodoInputVM {
  todo: string;
  onTodoChanged: (todoTitle: string) => void;
  onAddTodo: () => void;
}

export const TodoInput = observer((props: { model: TodoInputVM }) => {
  const { todo, onTodoChanged, onAddTodo } = props.model;

  return (
    <p>
      <input
        type="text"
        value={todo}
        placeholder="Todoを入れてね"
        onChange={ev => onTodoChanged(ev.currentTarget.value)}
      />
      <button onChange={() => onAddTodo()}>追加</button>
    </p>
  );
});

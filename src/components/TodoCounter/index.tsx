import * as React from "react";
import { observer } from "mobx-react";

export interface TodoCounterVM {
  totalCount: number;
  restCount: number;
}

export const TodoCounter = observer((props: { model: TodoCounterVM }) => {
  const { totalCount, restCount } = props.model;
  return (
    <p>
      残件数: {restCount} / 全件数: {totalCount}
    </p>
  );
});

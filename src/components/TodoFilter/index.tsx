import { observer } from "mobx-react";
import * as React from "react";

export interface TodoFilterVM {
  filterText: string;
  onChangeFilterText: (string) => void;
}

export const TodoFilter = observer((props: { model: TodoFilterVM }) => {
  const { filterText, onChangeFilterText } = props.model;

  return (
    <p>
      <input
        type="text"
        placeholder="絞込用のテキストをいれてね"
        value={filterText}
        onChange={ev => onChangeFilterText(ev.currentTarget.value)}
      />
    </p>
  );
});

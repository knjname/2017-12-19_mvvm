import { TodoFilterVM } from "./index";
import { AppModel } from "../../domain/App";
import { computed } from "mobx";

export class TodoFilterVMImpl implements TodoFilterVM {
  constructor(readonly appModel: AppModel) {}

  @computed
  get filterText() {
    return this.appModel.filterText;
  }

  onChangeFilterText = (todo: string) => {
    this.appModel.filterText = todo;
  };
}

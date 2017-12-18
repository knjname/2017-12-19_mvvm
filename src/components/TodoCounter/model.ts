import { TodoCounterVM } from "./index";
import { AppModel } from "../../domain/App";
import { computed } from "mobx";

export class TodoCounterVMImpl implements TodoCounterVM {
  constructor(readonly appModel: AppModel) {}

  @computed
  get totalCount() {
    return this.appModel.allCount;
  }

  @computed
  get restCount() {
    return this.totalCount - this.appModel.doneCount;
  }
}

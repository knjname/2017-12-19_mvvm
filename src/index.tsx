import * as React from "react";
import { render } from "react-dom";
import { AppModel } from "./domain/App";
import { App } from "./components/App/index";
import { AppVMImpl } from "./components/App/model";

const model = new AppModel();
const vmodel = new AppVMImpl(model);

const mountPoint = document.getElementById("app");

render(<App model={vmodel} />, mountPoint);

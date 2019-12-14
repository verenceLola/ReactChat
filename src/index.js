import { render } from "frint-react";

import RootApp from "./App/App";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

const app = new RootApp();

render(app, document.getElementById("root"));

serviceWorker.unregister();

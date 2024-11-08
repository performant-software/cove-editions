import "./App.css";
import { CoveEdition } from "./CoveEdition";
import { About } from "./components/About";

import { Config, AboutConfig } from "./types";

export interface AppProps {
  config: Config;
  about: AboutConfig;
}

function App(props: AppProps) {
  return (
    <div className="app-main">
      <div className="app-viewer">
        <CoveEdition config={props.config} />
      </div>
      <div className="app-about">
        <About config={props.about} />
      </div>
    </div>
  );
}

export default App;

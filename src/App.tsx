import "./App.css";
import { CoveEdition } from "./CoveEdition";

import { Config } from "./types";

export interface AppProps {
  configUrl?: string;
  config?: Config;
}

function App(props: AppProps) {
  return (
    <div className="app-main">
      <CoveEdition {...props} />
    </div>
  );
}

export default App;

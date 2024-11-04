import "./App.css";
import { AnnotationView } from "./components/AnnotationView/AnnotationView";

import { Config } from "./types";

export interface AppProps {
  config: Config;
}

function App(props: AppProps) {
  return <AnnotationView config={props.config} />;
}

export default App;

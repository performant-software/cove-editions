# COVE Viewer README

The COVE Viewer displays editions created in [Recogito Studio](https://recogitostudio.org/) and exported as TEI/XML with standoff markup. The configuration of the viewer adds contextual metadata and other tagging and filtering options. The COVE Viewer can be embedded in any website and linked to a configuration file loaded via a URL. 

## React Component Usage

To use the COVE Viewer in a React app, include `@performant-software/cove-edition` in your package.json and then invoke the react component in your application:

```
import { CoveEdition } from "@performant-software/cove-edition";
import "@performant-software/cove-edition/style.css";

const CONFIG_URL = "https://raw.githubusercontent.com/performant-software/cove-collections/refs/heads/main/data/documents/in-an-artists-studio-4915fa36-23f3-4471-a54b-7a1bb4287ce7.json";

function App() {
  return (
    <CoveEdition configUrl={CONFIG_URL} />
  );
}

export default App;
```


## Development Environment
If you wish to work on the CoveViewer itself, simple install the necessary Javascript dependencies:

`npm install`

Then, start a local server:

`npm run dev`

This will start a web server and load the configuration from the file `data/test-config.json`. 

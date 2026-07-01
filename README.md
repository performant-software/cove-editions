# COVE Editions Viewer Component

The COVE Editions Viewer displays documents created in [Recogito Studio](https://recogitostudio.org/) and exported as TEI/XML with standoff markup. The configuration of the viewer adds contextual metadata and other tagging and filtering options. The COVE Editions Viewer can be embedded in any React webpage and linked to a configuration file loaded via a URL. 

## React Component Usage

To use the COVE Editions Viewer in a React app, import the following dependencies:

```
import { CoveEdition } from "@performant-software/cove-edition";
import "@performant-software/cove-edition/style.css";
```

And then add the following component and props:

```
 <CoveEdition configUrl={CONFIG_URL} />
```

Examples of valid configuration files can be found [here](https://github.com/performant-software/cove-collections).

## Development Environment
If you wish to work on the CoveViewer itself, simple install the necessary Javascript dependencies:

`npm install`

Then, start a local server:

`npm run dev`

This will start a web server and load the configuration from the file `data/test-config.json`. 

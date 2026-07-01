# COVE Editions Viewer Component

The COVE Editions Viewer displays documents created in [Recogito Studio](https://recogitostudio.org/) and exported as TEI/XML with standoff markup. The configuration of the viewer adds contextual metadata and other tagging and filtering options. The COVE Editions Viewer can be embedded in any React webpage and linked to a configuration file loaded via a URL. 

## React Component Usage

To use the COVE Editions Viewer in a React app, install it via `npm install @performantsoftware/cove-edition`, then import the following dependencies in your app code:

```
import { CoveEdition } from "@performant-software/cove-edition";
import "@performant-software/cove-edition/style.css";
```

And then add the following component and props on the page where you want the viewer to appear:

```
 <CoveEdition configUrl={CONFIG_URL} />
```
Here the value of the `configUrl` prop should be a URL pointing at a valid JSON config file. Examples of valid configuration files can be found [here](https://github.com/performant-software/cove-collections).

## Development Environment
If you wish to work on the CoveViewer itself, simple install the necessary Javascript dependencies:

`npm install`

Then, start a local server:

`npm run dev`

This will start a web server and load the configuration from the file `data/test-config.json`. 

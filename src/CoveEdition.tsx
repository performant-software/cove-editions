import { Annotorious } from "@annotorious/react";
import { Config } from "./types";
import { AnnotationView } from "./components/AnnotationView";
import { useEffect, useMemo, useState } from "react";
import { About } from "./components/About";

export interface CoveEditionProps {
  config?: Config;
  configUrl?: string;
}

export const CoveEdition = (props: CoveEditionProps) => {
  const [configData, setConfigData] = useState<Config>();
  const { configUrl, config } = props;
  useEffect(() => {
    if (config) {
      setConfigData(config);
    } else if (configUrl) {
      fetch(configUrl)
        .then((resp) => resp.json())
        .then((data) => {
          setConfigData(data);
        });
    }
  }, [configUrl, config]);

  const textConfig = useMemo(
    () => ({
      teiUrl: configData?.teiUrl,
      tagVocabulary: configData?.tagVocabulary,
    }),
    [configData],
  );
  return (
    <div className="app-main">
      {configData?.teiUrl && (
        <>
          <div className="app-viewer">
            <Annotorious>
              <AnnotationView config={textConfig as Config} />
            </Annotorious>
          </div>
          {configData?.metadata && (
            <div className="app-about">
              <About config={configData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

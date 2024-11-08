import { Annotorious } from "@annotorious/react";
import { Config } from "./types";
import { AnnotationView } from "./components/AnnotationView";

export interface CoveEditionProps {
  config: Config;
}
export const CoveEdition = (props: CoveEditionProps) => {
  return (
    <Annotorious>
      <AnnotationView config={props.config} />
    </Annotorious>
  );
};

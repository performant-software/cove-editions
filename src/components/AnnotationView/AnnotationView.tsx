import "./AnnotationView.css";
import "@recogito/react-text-annotator/react-text-annotator.css";
import "./COVE.css";
import {
  CETEIcean,
  TEIAnnotator,
  TextAnnotationPopupContentProps,
  TextAnnotatorPopup,
} from "@recogito/react-text-annotator";

import { useEffect, useState, FC, useCallback } from "react";
import {
  useAnnotator,
  AnnotationState,
  Annotation,
  useSelection,
} from "@annotorious/react";
import {
  type TextAnnotator as RecogitoTextAnnotator,
  HighlightStyleExpression,
  TextAnnotation,
} from "@recogito/text-annotator";
import { useEmbeddedTEIAnnotations } from "./useEmbeddedAnnotations";
import { Popover } from "../Popover";
import { Sidebar } from "../Sidebar";
import { About } from "../About";
import { Config } from "../../types";

interface TestPopupProps extends TextAnnotationPopupContentProps {
  onClick(): void;
}

const TestPopup: FC<TestPopupProps> = (props) => {
  const { annotation } = props;

  if (annotation.bodies.length > 0) {
    const body = annotation.bodies[0];
    return (
      <div className="popup popup-overrides">
        {annotation.bodies.length > 0 && (
          <Popover
            text={annotation.target.selector[0].quote}
            author={body.creator?.name || ""}
            annotation={body.value || ""}
            tags={[]}
            onClick={props.onClick}
          />
        )}
      </div>
    );
  } else {
    return <div />;
  }
};

export interface AnnotationProps {
  config: Config;
}

export const AnnotationView = (props: AnnotationProps) => {
  const [file, setFile] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const anno = useAnnotator<RecogitoTextAnnotator>();

  const selection = useSelection<TextAnnotation>();

  const { annotations } = useEmbeddedTEIAnnotations(file || "");

  useEffect(() => {
    if (anno && annotations.length > 0) {
      anno.setAnnotations(annotations, false);
    }
  }, [anno, annotations]);

  useEffect(() => {
    fetch(props.config.teiUrl)
      .then((resp) => resp.text())
      .then((data) => setFile(data));
  }, [props.config.teiUrl]);
  const hse: HighlightStyleExpression = (
    _a: Annotation,
    state?: AnnotationState
  ) => ({
    fill: "#feef3d",
    fillOpacity: state?.selected ? 0.75 : 0.5,
  });

  const handleAnnotationClick = () => {
    setSidebarOpen(true);
  };

  const handleOnClickClose = useCallback(() => setSidebarOpen(false), []);

  if (file) {
    return (
      <>
        <div className="anno-desktop ">
          <div className="ta-desktop">
            <main className="ta-annotated-text-container tei">
              <div className="ta-annotated-text-container">
                <div className="page-wrapper">
                  <div className="content-wrapper">
                    <TEIAnnotator
                      annotatingEnabled={false}
                      style={hse}
                      //renderer="SPANS"
                    >
                      <CETEIcean tei={file} />
                    </TEIAnnotator>
                    <TextAnnotatorPopup
                      popup={(props) => {
                        return (
                          <TestPopup
                            onClick={handleAnnotationClick}
                            {...props}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <About config={props.config} />
            </main>
          </div>
        </div>
        <Sidebar
          opened={sidebarOpen}
          onClickClose={handleOnClickClose}
          annotation={
            selection.selected[0] ? selection.selected[0].annotation : undefined
          }
        />
      </>
    );
  } else {
    return <div />;
  }
};

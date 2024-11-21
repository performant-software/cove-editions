import "./AnnotationView.css";
import "@recogito/react-text-annotator/react-text-annotator.css";
import "./COVE.css";
import {
  CETEIcean,
  TEIAnnotator,
  TextAnnotationPopupContentProps,
  TextAnnotatorPopup,
} from "@recogito/react-text-annotator";

import { useEffect, useState, FC, useMemo } from "react";
import {
  useAnnotator,
  AnnotationState,
  Annotation,
  useSelection,
  Color,
} from "@annotorious/react";
import {
  type TextAnnotator as RecogitoTextAnnotator,
  HighlightStyleExpression,
  TextAnnotation,
} from "@recogito/text-annotator";
import { useEmbeddedTEIAnnotations } from "./useEmbeddedAnnotations";
import { Popover } from "../Popover";
import { Sidebar } from "../Sidebar";

import { Config } from "../../types";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface TestPopupProps extends TextAnnotationPopupContentProps {
  onClick(): void;
  selection: TextAnnotation;
}

const TestPopup: FC<TestPopupProps> = (props) => {
  const { annotation } = props;
  if (annotation.bodies.length > 0) {
    return (
      <div className="popup popup-overrides">
        {annotation.bodies.length > 0 && (
          <Popover annotation={props.selection} onClick={props.onClick} />
        )}
      </div>
    );
  } else {
    return <div />;
  }
};

type AnnoMap = {
  tags: { [key: string]: string };
  annotationAuthors: { [key: string]: string[] };
  annotationTags: { [key: string]: string[] };
  tagAnnotations: { [key: string]: string[] };
  annotations: { [key: string]: TextAnnotation };
};

export type Filters = {
  tags: string[];
  authors: string[];
};

export interface AnnotationProps {
  config: Config;
}

export const AnnotationView = (props: AnnotationProps) => {
  const [file, setFile] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adjust, setAdjust] = useState(false);
  const [annoMap, setAnnoMap] = useState<AnnoMap | undefined>();
  const [filtered, setFiltered] = useState<Filters>({ tags: [], authors: [] });

  const anno = useAnnotator<RecogitoTextAnnotator>();

  const selection = useSelection<TextAnnotation>();

  const { annotations } = useEmbeddedTEIAnnotations(file || "");

  const tags = useMemo(() => {
    const ret: Filters = {
      tags: [],
      authors: [],
    };
    if (annoMap) {
      ret.tags = Object.keys(annoMap.tags);
      ret.authors = Object.keys(annoMap.annotationAuthors);
    }

    return ret;
  }, [annoMap]);

  useEffect(() => {
    const createAnnoMap = () => {
      const map: AnnoMap = {
        tags: {},
        annotationAuthors: {},
        annotationTags: {},
        tagAnnotations: {},
        annotations: {},
      };

      props.config.tagVocabulary.forEach((v) => {
        map.tags[v.tagName] = v.tagColor;
      });

      annotations.forEach((a) => {
        map.annotations[a.id] = a;
        a.bodies.forEach((body) => {
          if (body.creator?.name) {
            if (!map.annotationAuthors[body.creator?.name]) {
              map.annotationAuthors[body.creator?.name] = [];
            }

            map.annotationAuthors[body.creator?.name].push(a.id);
          }
          if (body.purpose === "tagging" && body.value) {
            if (!map.annotationTags[body.value]) {
              map.annotationTags[body.value] = [];
            }
            if (!map.tagAnnotations[a.id]) {
              map.tagAnnotations[a.id] = [];
            }

            map.annotationTags[body.value].push(a.id);
            map.tagAnnotations[a.id].push(body.value);

            if (!map.tags[body.value]) {
              map.tags[body.value] = getRandomColor();
            }
          }
        });
      });

      return map;
    };
    if (anno && annotations.length > 0) {
      anno.setAnnotations(annotations, true);
      setAnnoMap(createAnnoMap());
    }
  }, [anno, annotations, props.config]);

  useEffect(() => {
    if (anno && annotations.length > 0 && annoMap) {
      if (filtered.authors.length === 0 && filtered.tags.length === 0) {
        anno.setAnnotations(annotations, true);
      } else {
        let list: string[] = [];
        if (filtered.authors.length === 0) {
          Object.keys(annoMap.annotationAuthors).forEach((k) => {
            if (annoMap.annotationAuthors[k]) {
              list = [...list, ...annoMap.annotationAuthors[k]];
            }
          });
        } else {
          filtered.authors.forEach((a) => {
            if (annoMap.annotationAuthors[a]) {
              list = [...list, ...annoMap.annotationAuthors[a]];
            }
          });
        }

        if (filtered.tags.length > 0) {
          let tagList: string[] = [];
          filtered.tags.forEach((t) => {
            if (annoMap.annotationTags[t]) {
              tagList = [...tagList, ...annoMap.annotationTags[t]];
            }
          });

          list = list.filter((v) => tagList.includes(v));
        }

        anno.setAnnotations(
          annotations.filter((a) => list.includes(a.id)),
          true
        );
      }
    }
  }, [filtered, anno, annotations, annoMap]);

  useEffect(() => {
    fetch(props.config.teiUrl)
      .then((resp) => resp.text())
      .then((data) => setFile(data));
  }, [props.config.teiUrl]);
  const hse: HighlightStyleExpression = (
    a: Annotation,
    state?: AnnotationState
  ) => {
    let color: Color = "#feef3d";
    if (annoMap) {
      const found = annoMap.tagAnnotations[a.id];
      if (found) {
        color = annoMap.tags[found[0]] as Color;
      }
    }
    return {
      fill: adjust ? "#AAAAAA33" : color,
      fillOpacity: state?.selected ? 0.75 : 0.5,
    };
  };

  const handleAnnotationClick = () => {
    setSidebarOpen(true);
  };

  const handleOnClickOpen = () => {
    setSidebarOpen(true);
  };

  const handleOnClickClose = () => {
    setSidebarOpen(false);
  };

  const handleAdjust = (adjust: boolean) => {
    setAdjust(adjust);
  };

  const handleToggleTagFilter = (tag: string) => {
    const copy: Filters = JSON.parse(JSON.stringify(filtered));
    const idx = copy.tags.findIndex((t) => t === tag);
    if (idx > -1) {
      copy.tags.splice(idx, 1);
    } else {
      copy.tags.push(tag);
    }

    setFiltered(copy);
  };

  const handleToggleAuthorFilter = (author: string) => {
    const copy: Filters = JSON.parse(JSON.stringify(filtered));
    const idx = copy.authors.findIndex((a) => a === author);
    if (idx > -1) {
      copy.authors.splice(idx, 1);
    } else {
      copy.authors.push(author);
    }

    setFiltered(copy);
  };

  return (
    <div className="anno-view">
      <div className="anno-desktop ">
        <div className="content-wrapper-2">
          <TEIAnnotator annotatingEnabled={false} style={hse}>
            <CETEIcean tei={file} />
          </TEIAnnotator>
          <TextAnnotatorPopup
            popup={(props) => {
              return (
                <TestPopup
                  onClick={handleAnnotationClick}
                  selection={selection.selected[0].annotation}
                  {...props}
                />
              );
            }}
          />
        </div>
      </div>
      <Sidebar
        opened={sidebarOpen}
        adjust={adjust}
        filtered={filtered}
        filters={tags}
        onClickClose={handleOnClickClose}
        onClickOpen={handleOnClickOpen}
        annotation={
          selection.selected[0] ? selection.selected[0].annotation : undefined
        }
        onAdjust={handleAdjust}
        onToggleTagFilter={handleToggleTagFilter}
        onToggleAuthorFilter={handleToggleAuthorFilter}
      />
    </div>
  );
};

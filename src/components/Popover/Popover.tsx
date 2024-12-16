import { FaUser } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";

import "./Popover.css";
import { useEffect, useState } from "react";
import type { AnnotationBody } from "../../../node_modules/@annotorious/core/dist/model/Annotation.d.ts";
import { TextAnnotation } from "@recogito/react-text-annotator";

export type Tag = {
  category: string;
  tag: string;
};
export interface PopoverProps {
  annotation: TextAnnotation;

  onClick(): void;
}

type EditionAnno = {
  id: string;
  quote: string;
  annotation: string[];
  author: string;
};

type EditionTag = {
  id: string;
  name: string;
  color: string;
  quote: string;
  annotation: string;
  author: string;
};

export const Popover = (props: PopoverProps) => {
  const [annotations, setAnnotations] = useState<EditionAnno[]>([]);
  const [tags, setTags] = useState<EditionTag[]>([]);

  useEffect(() => {
    const annos: EditionAnno[] = [];
    const ts: EditionTag[] = [];

    props.annotation.bodies.forEach((body: AnnotationBody) => {
      if (body.purpose === "tagging") {
        ts.push({
          id: body.id,
          name: body.value || "Unknown",
          color: "green",
          quote: props.annotation.target.selector[0].quote,
          author:
            body.creator?.name ||
            props.annotation.target.creator?.name ||
            "Anonymous",
          annotation: "_no_annotation_",
        });
      } else {
        const lines = body.value?.split("\n");
        annos.push({
          id: body.id,
          quote: props.annotation.target.selector[0].quote,
          annotation: lines || [body.value || ""],
          author:
            body.creator?.name ||
            props.annotation.target.creator?.name ||
            "Anonymous",
        });
      }
    });

    setAnnotations(annos);
    setTags(ts);
  }, [props.annotation]);

  if (annotations.length > 0 || tags.length > 0) {
    return (
      <div className="popover-wrapper" onClick={props.onClick}>
        {annotations.map((a, idx) => {
          return (
            <div className="popover-content" key={a.id}>
              <table>
                <tbody>
                  {idx === 0 && (
                    <tr>
                      <td
                        className="popover-annotated-text popover-truncate"
                        colSpan={2}
                      >
                        {`...${a.quote}`}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="popover-person-option">
                      <FaUser color="#1e95e5" />
                      {a.author}
                    </td>
                  </tr>
                  <tr>
                    <div className="popover-tag-row">
                      {tags.map((t, idx) => (
                        <td className="popover-category-option" key={idx}>
                          {idx === 0 && <FaTag color={t.color} />}
                          <div className="popover-tag">{t.name}</div>
                        </td>
                      ))}
                    </div>
                  </tr>
                  <tr>
                    <td className="popover-teaser">
                      <div className="popover-annotation">
                        {a.annotation[0] === "_no_annotation_"
                          ? ""
                          : a.annotation.map((l, idx) => {
                              if (
                                l.startsWith("http") &&
                                [".jpg", ".png"].includes(l.slice(-4))
                              ) {
                                return (
                                  <img
                                    key={idx}
                                    src={l}
                                    className="popover-annotation-img"
                                    alt="image in annotation"
                                  />
                                );
                              } else if (l.startsWith("http")) {
                                return (
                                  <a key={idx} href={l}>
                                    {l}
                                  </a>
                                );
                              } else {
                                return (
                                  <div className="popover-annotation-line">
                                    {l}
                                  </div>
                                );
                              }
                            })}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div />;
  }
};

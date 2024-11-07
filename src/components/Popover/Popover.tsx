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
  annotation: string;
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
          author: body.creator?.name || "Anonymous",
          annotation: "_no_annotation_",
        });
      } else {
        annos.push({
          id: body.id,
          quote: props.annotation.target.selector[0].quote,
          annotation: body.value || "",
          author: body.creator?.name || "Anonymous",
        });
      }
    });

    setAnnotations(annos.length > 0 ? annos : ts);
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
                    {tags.map((t, idx) => (
                      <td className="popover-category-option" key={idx}>
                        {idx === 0 && <FaTag color={t.color} />}
                        <div className="popover-tag">{t.name}</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="popover-teaser">
                      {a.annotation === "_no_annotation_" ? "" : a.annotation}
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

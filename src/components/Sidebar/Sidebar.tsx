import { FaUser } from "react-icons/fa6";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

import "./Sidebar.css";
import { TextAnnotation } from "@recogito/react-text-annotator";
import { useEffect, useState } from "react";
import { Tabs, TabsTypes } from "./Tabs/Tabs";
import { Filters } from "../AnnotationView/AnnotationView";
import sanitizeHtml from "sanitize-html";

const sanitize = (raw: string) => {
  if (raw.includes('<script') || raw.includes('<style')) {
    return '';
  }
  return sanitizeHtml(raw, {
    allowedTags: false,
    allowedAttributes: false,
    allowVulnerableTags: true
  });
}

export const Sidebar = ({
  opened,
  annotation,
  adjust,
  filtered,
  filters,
  onClickClose,
  onClickOpen,
  onAdjust,
  onToggleTagFilter,
  onToggleAuthorFilter,
}: {
  opened: boolean;
  adjust: boolean;
  annotation: TextAnnotation | undefined;
  filtered: Filters;
  filters: Filters;
  onClickClose: () => void;
  onClickOpen: () => void;
  onAdjust: (adjust: boolean) => void;
  onToggleTagFilter: (tag: string) => void;
  onToggleAuthorFilter: (tag: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<TabsTypes>("annotations");
  const [hoverTag, setHoverTag] = useState<string | undefined>();
  const [hoverAuthor, setHoverAuthor] = useState<string | undefined>();

  useEffect(() => {
    setHoverAuthor(undefined);
    setHoverTag(undefined);
  }, [filtered]);

  const handleAdjust = (adjust: boolean) => {
    onAdjust(adjust);
  };

  const tags: string[] = [];

  annotation?.bodies.forEach((body) => {
    if (body.purpose === "tagging") {
      tags.push(body.value || "Unknown");
    }
  });

  const isFiltered = filtered.authors.length > 0 || filtered.tags.length > 0;

  return (
    <div className={`wrapper ${opened ? "visible" : ""}`}>
      <aside className={`sidebar ${opened ? "opened" : ""}`}>
        <Tabs
          activeTab={activeTab}
          adjust={adjust}
          onSetActiveTab={setActiveTab}
          onAdjust={handleAdjust}
        />
        <div className="sidebar-background">
          <div
            className="sidebar-handle"
            onClick={opened ? () => onClickClose() : () => onClickOpen()}
          >
            {opened ? <FaAnglesRight size={35} /> : <FaAnglesLeft size={35} />}
          </div>

          {activeTab === "annotations" ? (
            <>
              <div className="sidebar-header">
                {annotation ? (
                  <div
                    className={
                      tags.length > 0
                        ? "sidebar-author third"
                        : "sidebar-author"
                    }
                  >
                    <FaUser color="#1e95e5" />
                    {annotation.bodies[0].creator?.name ||
                      annotation.target.creator?.name}
                  </div>
                ) : (
                  <div className="sidebar-header-spacer" />
                )}
                {tags.length > 0 && (
                  <div className="sidebar-tag-container">
                    {tags.map((tag, idx) => (
                      <div className="sidebar-tag-sub-container" key={idx}>
                        {idx === 0 && (
                          <FaTag color="green" style={{ paddingRight: 5 }} />
                        )}
                        <div className="sidebar-tag">{tag}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="sidebar-content">
                {annotation ? (
                  <div className="sidebar-quote">
                    {`"${annotation.target.selector[0].quote}"`}
                  </div>
                ) : (
                  <div className="sidebar-content-empty">
                    Annotation Details
                  </div>
                )}
                <div className="sidebar-annotation">
                  {annotation && annotation.bodies[0]
                    ? annotation.bodies.map((b, idx) => {
                        if (b.purpose !== "tagging") {
                          return (
                            <div key={b.id}>
                              {idx !== 0 && (
                                <div className="sidebar-annotation-extra-author">
                                  <FaUser color="#1e95e5" />
                                  <div>
                                    {b.creator?.name ||
                                      annotation.target.creator?.name}
                                  </div>
                                </div>
                              )}
                              {/* @ts-expect-error b.content doesn't exist on imported type */}
                              <div dangerouslySetInnerHTML={{__html: sanitize(b.content)}} />
                            </div>
                          );
                        } else {
                          return <div key={b.id} />;
                        }
                      })
                    : "Select an annotation, or click the 'filters' tab above to filter the document."}
                </div>
              </div>
            </>
          ) : (
            <div className="sidebar-filters">
              <div
                className={
                  isFiltered
                    ? "sidebar-filter-header"
                    : "sidebar-filter-header sidebar-filter-header-active"
                }
              >
                <div className="sidebar-filter-header-toggle">
                  {isFiltered ? (
                    <FaToggleOn size={24} />
                  ) : (
                    <FaToggleOff size={24} />
                  )}
                  <div className="sidebar-filter-toggle-text">
                    {isFiltered ? "Filter: ON" : "Filter: OFF"}
                  </div>
                </div>
                <div className="sidebar-filter-header-divider" />
                {filtered.tags.map((t) => (
                  <div
                    key={t}
                    className="sidebar-filter-option"
                    onClick={() => onToggleTagFilter(t)}
                    onMouseEnter={() => setHoverTag(t)}
                    onMouseLeave={() => setHoverTag(undefined)}
                  >
                    {hoverTag === t ? (
                      <FaMinusCircle color="red" style={{ paddingRight: 5 }} />
                    ) : (
                      <FaTag color="green" style={{ paddingRight: 5 }} />
                    )}
                    {t}
                  </div>
                ))}
                {filtered.authors.map((a) => (
                  <div
                    key={a}
                    className="sidebar-filter-option"
                    onClick={() => onToggleAuthorFilter(a)}
                    onMouseEnter={() => setHoverAuthor(a)}
                    onMouseLeave={() => setHoverAuthor(undefined)}
                  >
                    {hoverAuthor === a ? (
                      <FaMinusCircle color="red" style={{ paddingRight: 5 }} />
                    ) : (
                      <FaUser color="#1e95e5" style={{ paddingRight: 5 }} />
                    )}
                    {a}
                  </div>
                ))}
              </div>
              <div className="sidebar-filter-tag-set">
                Tags:
                <div className="sidebar-filter-tags">
                  {filters.tags.map((t) =>
                    filtered.tags.includes(t) ? (
                      <div />
                    ) : (
                      <div
                        key={t}
                        className="sidebar-filter-option"
                        onClick={() => onToggleTagFilter(t)}
                        onMouseEnter={() => setHoverTag(t)}
                        onMouseLeave={() => setHoverTag(undefined)}
                      >
                        {hoverTag === t ? (
                          filtered.tags.includes(t) ? (
                            <FaMinusCircle
                              color="red"
                              style={{ paddingRight: 5 }}
                            />
                          ) : (
                            <FaPlusCircle
                              color="green"
                              style={{ paddingRight: 5 }}
                            />
                          )
                        ) : (
                          <FaTag color="green" style={{ paddingRight: 5 }} />
                        )}
                        {t}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="sidebar-filter-tag-set">
                People:
                <div className="sidebar-filter-tags">
                  {filters.authors.map((t) =>
                    filtered.authors.includes(t) ? (
                      <div />
                    ) : (
                      <div
                        key={t}
                        className="sidebar-filter-option"
                        onClick={() => onToggleAuthorFilter(t)}
                        onMouseEnter={() => setHoverAuthor(t)}
                        onMouseLeave={() => setHoverAuthor(undefined)}
                      >
                        {hoverAuthor === t ? (
                          <FaPlusCircle
                            color="green"
                            style={{ paddingRight: 5 }}
                          />
                        ) : (
                          <FaUser color="#1e95e5" style={{ paddingRight: 5 }} />
                        )}
                        {t}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

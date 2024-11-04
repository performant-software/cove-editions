import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import "./Sidebar.css";
import { TextAnnotation } from "@recogito/react-text-annotator";

export const Sidebar = ({
  opened,
  annotation,
  onClickClose,
}: {
  opened: boolean;
  annotation: TextAnnotation | undefined;
  onClickClose: () => void;
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleClose = () => {
    setIsSidebarVisible(false);
    setTimeout(() => onClickClose(), 300);
  };

  useEffect(() => {
    if (opened) {
      setIsSidebarVisible(true);
    }
  }, [opened]);

  return (
    <div
      onClick={handleClose}
      className={`wrapper ${isSidebarVisible ? "visible" : ""}`}
    >
      {annotation && (
        <aside className={`sidebar ${isSidebarVisible ? "opened" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-author">
              <FaUser color="#1e95e5" />
              {annotation.bodies[0].creator?.name}
            </div>
            {/* <div className="sidebar-tags"></div> */}
          </div>
          <div className="sidebar-content">
            <div className="sidebar-quote">
              {`"${annotation.target.selector[0].quote}"`}
            </div>
            <div className="sidebar-annotation">
              {annotation.bodies[0].value}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

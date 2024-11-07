import { FaAdjust } from "react-icons/fa";

import "./Tabs.css";

export type TabsTypes = "annotations" | "filters";

export interface TabsProps {
  activeTab: TabsTypes;
  adjust: boolean;

  onSetActiveTab(tab: TabsTypes): void;
  onAdjust(adjust: boolean): void;
}

export const Tabs = (props: TabsProps) => {
  return (
    <div className="header-tabs">
      <ul>
        <li
          className="header-adjust active"
          onClick={() => props.onAdjust(!props.adjust)}
        >
          <FaAdjust size={20} color={props.adjust ? "#1b6c7a" : undefined} />
        </li>
        <li
          className={props.activeTab === "annotations" ? "active" : undefined}
          onClick={() => props.onSetActiveTab("annotations")}
        >
          Annotations
        </li>
        <li
          className={props.activeTab === "filters" ? "active" : undefined}
          onClick={() => props.onSetActiveTab("filters")}
        >
          Filters
        </li>
      </ul>
    </div>
  );
};

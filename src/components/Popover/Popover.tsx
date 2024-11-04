import { FaUser } from "react-icons/fa6";

import "./Popover.css";

export type Tag = {
  category: string;
  tag: string;
};
export interface PopoverProps {
  text: string;
  author: string;
  tags: Tag[];
  annotation: string;

  onClick(): void;
}

export const Popover = (props: PopoverProps) => {
  return (
    <div className="popover-wrapper" onClick={props.onClick}>
      <div className="popover-content">
        <table>
          <tbody>
            <tr>
              <td
                className="popover-annotated-text popover-truncate"
                colSpan={2}
              >
                {`...${props.text}`}
              </td>
            </tr>
            <tr>
              <td className="popover-person-option">
                <FaUser color="#1e95e5" />
                {props.author}
              </td>
            </tr>
            {props.tags.length > 0 && (
              <tr>
                <td className="popover-category-option">
                  {props.tags[0].category}
                </td>
              </tr>
            )}
            <tr>
              <td className="popover-teaser">{props.annotation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

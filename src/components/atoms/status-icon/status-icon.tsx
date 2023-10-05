import type { Size, Status } from "@types";
import cn from "classnames";
import "./status-icon.css";

export interface IStatusIcon {
  status: Status;
  size: Size;
  idle?: boolean;
}

export const StatusIcon = (props: IStatusIcon) => {
  const statusIcon = (): string => {
    return cn("status-icon", {
      "status-icon--success": props.status === "success",
      "status-icon--error": props.status === "error",
      "status-icon--xs": props.size === "xs",
      "status-icon--s": props.size === "s",
      "status-icon--m": props.size === "m",
      "status-icon--l": props.size === "l",
      "status-icon--xl": props.size === "xl",
      "status-icon--2xl": props.size === "2xl",
      "status-icon--3xl": props.size === "3xl",
      "status-icon--4xl": props.size === "4xl",
      "status-icon--idle": !!props.idle,
      "status-icon--active": !props.idle,
    });
  };

  return <div className={statusIcon()} />;
};

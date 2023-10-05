import type { PropsWithChildren } from "react";
import type { Size, Status } from "@types";
import cn from "classnames";
import "./label.css";

export interface ILabel {
  htmlFor: string;
  size: Size;
  status: Status;
}

export const Label = (props: PropsWithChildren<ILabel>) => {
  const labelCn = (): string => {
    return cn("label", {
      "label--xs": props.size === "xs",
      "label--s": props.size === "s",
      "label--m": props.size === "m",
      "label--l": props.size === "l",
      "label--xl": props.size === "xl",
      "label--2xl": props.size === "2xl",
      "label--3xl": props.size === "3xl",
      "label--4xl": props.size === "4xl",
      "label--neutral": props.status === "neutral",
      "label--success": props.status === "success",
      "label--error": props.status === "error",
    });
  };

  return (
    <label htmlFor={props.htmlFor} data-size={props.size} data-status={props.status} className={labelCn()}>
      {props.children}
    </label>
  );
};

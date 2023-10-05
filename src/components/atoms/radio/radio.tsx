import type { Size, Status } from "@types";
import cn from "classnames";
import "./radio.css";

export interface IRadio {
  value: boolean;
  size: Size;
  status: Status;
  focused?: boolean;
  disabled?: boolean;
}

export const Radio = (props: IRadio) => {
  const radioCn = (): string => {
    return cn("radio", {
      "radio--xs": props.size === "xs",
      "radio--s": props.size === "s",
      "radio--m": props.size === "m",
      "radio--l": props.size === "l",
      "radio--xl": props.size === "xl",
      "radio--2xl": props.size === "2xl",
      "radio--3xl": props.size === "3xl",
      "radio--4xl": props.size === "4xl",
      "radio--error": props.status === "error",
      "radio--neutral": props.status === "neutral",
      "radio--success": props.status === "success",
      "radio--checked": props.value,
      "radio--focused": !!props.focused,
      "radio--disabled": !!props.disabled,
    });
  };

  return <div className={radioCn()} />;
};

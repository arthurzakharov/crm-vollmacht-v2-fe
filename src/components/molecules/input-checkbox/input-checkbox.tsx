import type { MouseEvent, PropsWithChildren } from "react";
import type { Status, Size } from "@types";
import { useToggle } from "usehooks-ts";
import cn from "classnames";
import { Checkbox } from "@atoms/checkbox";
import { Label } from "@atoms/label";
import { StatusIcon } from "@atoms/status-icon";
import "./input-checkbox.css";

// TODO: Maybe replace later data-id usage that is needed for useCheckoutRefs

export interface IInputCheckbox extends PropsWithChildren {
  value: boolean;
  name: string;
  status: Status;
  labelSize: Size;
  onChange: (v: boolean) => void;
}

export const InputCheckbox = (props: IInputCheckbox) => {
  const [isFocused, toggleFocused] = useToggle(false);

  const onContentClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    if (element.tagName === "BUTTON" || element.tagName === "A") return;
    props.onChange(!props.value);
  };

  const contentCn = (): string => {
    return cn("input-checkbox__content", {
      "input-checkbox__content--neutral": props.status === "neutral",
      "input-checkbox__content--success": props.status === "success",
      "input-checkbox__content--error": props.status === "error",
    });
  };

  return (
    <div data-id={props.name} className="input-checkbox">
      <input
        type="checkbox"
        tabIndex={0}
        id={props.name}
        checked={props.value}
        className="input-checkbox__element"
        onFocus={() => toggleFocused()}
        onBlur={() => toggleFocused()}
        onChange={() => props.onChange(!props.value)}
      />
      <div className={contentCn()} onClick={onContentClick}>
        <div className="input-checkbox__checkbox-wrap">
          <Checkbox value={props.value} focused={isFocused} />
        </div>
        <div className="input-checkbox__label">
          <Label htmlFor={props.name} size={props.labelSize} status="neutral">
            {props.children}
          </Label>
        </div>
      </div>
      {props.status === "error" && (
        <div className="input-checkbox__icon">
          <StatusIcon status="error" size="m" />
        </div>
      )}
    </div>
  );
};

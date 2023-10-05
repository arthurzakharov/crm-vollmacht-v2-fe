import type { ChangeEvent } from "react";
import type { Status } from "@types";
import cn from "classnames";
import "./textarea.css";

export interface ITextarea {
  rows: number;
  value: string;
  name: string;
  placeholder?: string;
  status?: Status;
  disabled?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Textarea = (props: ITextarea) => {
  const textarea = (): string => {
    return cn("textarea", {
      "textarea--neutral": props.status === "neutral",
      "textarea--error": props.status === "error",
    });
  };

  return (
    <textarea
      rows={props.rows}
      value={props.value}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      disabled={props.disabled}
      className={textarea()}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onChange(e.target.value)}
    />
  );
};

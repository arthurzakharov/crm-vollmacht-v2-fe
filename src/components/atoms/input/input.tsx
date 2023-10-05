import type { ChangeEvent } from "react";
import type { Color, Status } from "@types";
import InputMask from "react-input-mask";
import cn from "classnames";
import "./input.css";

export interface IInput {
  value: string;
  name: string;
  color: Color;
  masked?: boolean;
  status?: Status;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input = (props: IInput) => {
  const inputCn = (): string => {
    return cn("input", {
      "input--blue": props.color === "blue",
      "input--gray": props.color === "gray",
      "input--neutral": props.status === "neutral",
      "input--success": props.status === "success",
      "input--error": props.status === "error",
    });
  };

  return props.masked ? (
    <InputMask
      value={props.value}
      name={props.name}
      id={props.name}
      className={inputCn()}
      disabled={props.disabled}
      mask="99/99/9999"
      maskPlaceholder="TT/MM/JJJJ"
      placeholder={props.placeholder}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  ) : (
    <input
      maxLength={props.maxLength}
      value={props.value}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      className={inputCn()}
      disabled={props.disabled}
      onFocus={() => props.onFocus && props.onFocus()}
      onBlur={() => props.onBlur && props.onBlur()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  );
};

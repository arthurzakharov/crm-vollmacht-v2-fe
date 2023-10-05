import type { Color, Size, Status } from "@types";
import { useToggle } from "usehooks-ts";
import { Input } from "@atoms/input";
import { Label } from "@atoms/label";
import { StatusIcon } from "@atoms/status-icon";
import "./input-text.css";

export interface IInputText {
  label: string;
  value: string;
  name: string;
  status: Status;
  color: Color;
  labelSize: Size;
  iconSize: Size;
  popup?: string;
  placeholder?: string;
  masked?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputText = (props: IInputText) => {
  const [isFocused, toggleIsFocused] = useToggle(false);

  const onInputFocus = (): void => {
    props.onFocus && props.onFocus();
    toggleIsFocused();
  };

  const onInputBlur = (): void => {
    props.onBlur && props.onBlur();
    toggleIsFocused();
  };

  const isPopupVisible = (): boolean => !!props.popup && props.status === "error" && isFocused;

  const isStatusIconVisible = (): boolean =>
    !props.disabled && (props.status === "error" || props.status === "success");

  const getStatusIconState = (): Status => (props.status === "error" ? "error" : "success");

  return (
    <div className="input-text">
      {isPopupVisible() && <div className="input-text__popup">{props.popup}</div>}
      <div className="input-text__label">
        <Label htmlFor={props.name} size={props.labelSize} status="neutral">
          {props.label}
        </Label>
      </div>
      <div className="input-text__wrap">
        <Input
          masked={props.masked}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          status={props.status}
          color={props.color}
          disabled={props.disabled}
          maxLength={props.maxLength}
          onChange={(v: string) => props.onChange(v)}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        {isStatusIconVisible() && (
          <div className="input-text__icon">
            <StatusIcon status={getStatusIconState()} size={props.iconSize} />
          </div>
        )}
      </div>
    </div>
  );
};

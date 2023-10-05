import type { MouseEvent } from "react";
import type { Option, Size, Status } from "@types";
import { useState } from "react";
import { Label } from "@atoms/label";
import { Radio } from "@atoms/radio";
import "./input-radio.css";

export interface IInputRadio {
  options: Option[];
  value: string;
  name: string;
  status: Status;
  sizeRadio: Size;
  sizeLabel: Size;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const InputRadio = (props: IInputRadio) => {
  const [focusedOption, setFocusedOption] = useState<string>("");

  const onOptionClick = (e: MouseEvent<HTMLDivElement>, value: string): void => {
    e.preventDefault();
    if ((e.clientX === 0 && e.clientY === 0) || props.disabled) return;
    props.onChange(value);
  };

  return (
    <div className="input-radio">
      {props.options.map((option: Option) => (
        <div key={option.value} className="input-radio__option" onClick={(e) => onOptionClick(e, option.value)}>
          <input
            id={option.value}
            value={option.value}
            name={props.name}
            disabled={props.disabled}
            type="radio"
            checked={props.value === option.value}
            className="input-radio__element"
            onFocus={(e) => setFocusedOption(e.target.value)}
            onBlur={() => setFocusedOption("")}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <div className="input-radio__box">
            <Radio
              value={props.value === option.value}
              focused={focusedOption === option.value}
              disabled={props.disabled}
              status={props.status}
              size={props.sizeRadio}
            />
          </div>
          <div className="input-radio__label">
            <Label htmlFor={option.value} size={props.sizeLabel} status={props.status}>
              {option.label}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

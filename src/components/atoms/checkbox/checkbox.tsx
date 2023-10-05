import cn from "classnames";
import "./checkbox.css";

export interface ICheckbox {
  value: boolean;
  focused?: boolean;
  disabled?: boolean;
}

export const Checkbox = (props: ICheckbox) => {
  const checkboxCn = (): string => {
    return cn("checkbox", {
      "checkbox--checked": props.value,
      "checkbox--not-checked": !props.value,
      "checkbox--focused": !!props.focused,
      "checkbox--disabled": !!props.disabled,
    });
  };

  return <div className={checkboxCn()} />;
};

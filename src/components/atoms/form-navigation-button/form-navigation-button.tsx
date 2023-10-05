import cn from "classnames";
import "./form-navigation-button.css";

export interface IFormNavigationButton {
  type: "backward" | "forward";
  disabled?: boolean;
  onClick: () => void;
}

export const FormNavigationButton = (props: IFormNavigationButton) => {
  const formNavigationButton = (): string => {
    return cn("form-navigation-button", {
      "form-navigation-button--backward": props.type === "backward",
      "form-navigation-button--forward": props.type === "forward",
    });
  };

  return (
    <button disabled={props.disabled} className={formNavigationButton()} onClick={() => props.onClick()}>
      {props.type === "forward" ? "Weiter" : "Zurück"}
      {props.type === "forward" && <div />}
    </button>
  );
};

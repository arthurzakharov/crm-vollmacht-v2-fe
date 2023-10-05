import type { MouseEvent } from "react";
import type { Status } from "@types";
import { useEffect, useState } from "react";
import cn from "classnames";
import { Dropdown } from "@atoms/dropdown";
import { Input } from "@atoms/input";
import { Textarea } from "@atoms/textarea";
import { InputRadio } from "@molecules/input-radio";
import { handleButtonFocusState } from "@utils/application";
import "./question.css";

export interface QuestionProps<Q> {
  order?: Q[];
  active?: Q;
  isNextButtonHidden?: boolean;
  title: string;
  name: Q;
  value: string;
  type: "radio" | "text" | "textarea" | "dropdown";
  status: Status;
  description?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  isSearchHidden?: boolean;
  options?: InputRadioOption[] | DropdownOption[];
  onChange: (value: string, name: Q) => void;
  onAnsweredClick?: (name: Q) => void;
  onNext?: (name: Q, order: Q[]) => void;
}

export const Question = <Q extends unknown>({
  order = [],
  active,
  isNextButtonHidden = false,
  title,
  name,
  value,
  type,
  description,
  placeholder,
  rows,
  required,
  isSearchHidden,
  options,
  status,
  onChange,
  onAnsweredClick,
  onNext,
}: QuestionProps<Q>) => {
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);

  const position = (): "active" | "answered" | "in-queue" => {
    const questionIndex = order.indexOf(name);
    const currentIndex = order.indexOf(active as Q);
    if (active && questionIndex < currentIndex) return "answered";
    if (active && questionIndex > currentIndex) return "in-queue";
    return "active";
  };

  const isActive = (): boolean => position() === "active";

  const isAnswered = (): boolean => position() === "answered";

  const isInQueue = (): boolean => position() === "in-queue";

  const defineIfButtonIsVisible = (): boolean => {
    if (required && !value) return false;
    return isActive() && !isInQueue() && !isAnswered() && !isNextButtonHidden;
  };

  const onQuestionClick = (): void => {
    if (onAnsweredClick && isAnswered()) onAnsweredClick(name);
  };

  const onKeyPress = (e: KeyboardEvent): void => {
    if (e.code === "Enter" && onNext) {
      onNext(name, order);
    }
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>): void => {
    handleButtonFocusState(e);
    if (onNext) onNext(name, order);
  };

  const getQuestionClassNames = (): string =>
    cn(
      "question",
      `question--${type}`,
      `question--${name}`,
      isAnswered() ? "question--answered" : "question--not-answered",
      isInQueue() ? "question--in-queue" : "question--not-in-queue",
    );

  useEffect(() => {
    setIsButtonVisible(defineIfButtonIsVisible());
  }, [order, name, active, required, value, isNextButtonHidden]);

  useEffect(() => {
    if (isButtonVisible) {
      document.addEventListener("keypress", onKeyPress);
    }
    return () => {
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [isButtonVisible]);

  return (
    <div className={getQuestionClassNames()} onClick={onQuestionClick}>
      <h6 className="question__title">{title}</h6>
      {description && <p className="question__description">{description}</p>}
      <div className="question__content">
        {type === "radio" && options && (
          <InputRadio
            options={options}
            value={value}
            status="neutral"
            sizeRadio="m"
            sizeLabel="m"
            name={name as string}
            onChange={(value: string) => onChange(value, name)}
          />
        )}
        {type === "text" && (
          <Input
            color="gray"
            value={value}
            name={name as string}
            placeholder={placeholder}
            onChange={(v) => onChange(v, name)}
          />
        )}
        {type === "textarea" && (
          <Textarea
            placeholder={placeholder}
            rows={rows || 4}
            value={value}
            name={name as string}
            onChange={(value: string) => onChange(value, name)}
          />
        )}
        {type === "dropdown" && options && (
          <Dropdown
            status={status}
            isSearchHidden={isSearchHidden}
            placeholder={placeholder}
            options={options}
            value={value}
            onChange={(value: string) => onChange(value, name)}
          />
        )}
      </div>
      {isButtonVisible && (
        <div className="question__next">
          <button onClick={onClick}>Weiter</button>
          <span>
            oder <i>EINGABE</i> drücken
          </span>
        </div>
      )}
    </div>
  );
};

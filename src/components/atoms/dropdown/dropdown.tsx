import type { MouseEvent } from "react";
import type { Status } from "@types";
import { useEffect, useRef, useState } from "react";
import { useDebounce, useOnClickOutside, useToggle, useUpdateEffect } from "usehooks-ts";
import cn from "classnames";
import searchSrc from "/png/search.png";
import arrowGraySrc from "/png/arrow-gray.png";
import "./dropdown.css";

export interface IDropdown {
  options: DropdownOption[];
  value: string;
  status: Status;
  placeholder?: string;
  noResult?: string;
  isSearchHidden?: boolean;
  stopPropagation?: boolean;
  onChange: (value: string) => void;
}

export const Dropdown = (props: IDropdown) => {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false);
  const [list, setList] = useState(props.options);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInputField = (): void => {
    inputRef.current && inputRef.current.focus();
  };

  const addOpenStylesToBox = (): void => {
    if (boxRef.current && boxContentRef.current) {
      const { height } = boxContentRef.current.getBoundingClientRect();
      boxRef.current.setAttribute("style", `height: ${height}px;`);
      setTimeout(() => boxRef.current && boxRef.current.setAttribute("style", "height: auto;"), 300);
      setTimeout(focusInputField, 500);
    }
  };

  const addCloseStylesToBox = (): void => {
    if (boxRef.current && boxContentRef.current) {
      const { height } = boxContentRef.current.getBoundingClientRect();
      boxRef.current.setAttribute("style", `height: ${height}px;`);
      setTimeout(() => boxRef.current && boxRef.current.setAttribute("style", "height: 0px;"), 0);
    }
  };

  const filterOptions = ({ label }: DropdownOption): boolean =>
    label.toLowerCase().includes(debouncedSearch.toLowerCase());

  const onButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget as HTMLButtonElement;
    button.blur();
    if (props.stopPropagation) e.stopPropagation();
    toggleIsOpen();
  };

  const onOptionClick = (e: MouseEvent<HTMLLIElement>, value: string): void => {
    if (props.stopPropagation) e.stopPropagation();
    setIsOpen(false);
    props.onChange(value);
  };

  const replaceAt = (str: string, index: number, length: number, replacement: string): string =>
    str.substring(0, index) + replacement + str.substring(index + length);

  const getLabel = (label: string): string => {
    if (!debouncedSearch) return label;
    const reg = new RegExp(`${debouncedSearch}`, "gi");
    let result: RegExpExecArray[] = [];
    let match: RegExpExecArray | null = null;
    let updatedLabel: string = "";
    while ((match = reg.exec(label)) !== null) result.push(match);
    if (result.length) {
      result.forEach((result) => {
        updatedLabel = replaceAt(result.input, result.index, result[0].length, `<strong><u>${result[0]}</u></strong>`);
      });
      return updatedLabel;
    }
    return label;
  };

  const getButtonText = (): string => {
    return props.value
      ? props.options.find((option) => option.value === props.value)?.label || ""
      : props.placeholder || "";
  };

  const buttonCn = (): string => {
    return cn("dropdown__button", isOpen ? "dropdown__button--opened" : "dropdown__button--closed", {
      "dropdown__button--neutral": props.status === "neutral",
      "dropdown__button--success": props.status === "success",
      "dropdown__button--error": props.status === "error",
    });
  };

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  useUpdateEffect(() => {
    isOpen ? addOpenStylesToBox() : addCloseStylesToBox();
    setTimeout(() => setSearch(""), 300);
  }, [isOpen]);

  useEffect(() => setList(props.options.filter(filterOptions)), [debouncedSearch]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <button type="button" tabIndex={0} className={buttonCn()} onClick={onButtonClick}>
        <span dangerouslySetInnerHTML={{ __html: getButtonText() }} className="dropdown__value" />
        <div className="dropdown__shade">
          <img alt="arrow" src={arrowGraySrc} className="dropdown__arrow" />
        </div>
      </button>
      <div ref={boxRef} className="dropdown__box">
        <div ref={boxContentRef}>
          {!props.isSearchHidden && (
            <div className="dropdown__search">
              <input
                ref={inputRef}
                value={search}
                title="Suchen"
                type="text"
                className="dropdown__input"
                tabIndex={isOpen ? 0 : -1}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img alt="search" src={searchSrc} className="dropdown__magnifier" />
            </div>
          )}
          <ul className="dropdown__options">
            {list.map(({ value, label }) => (
              <li key={value} className="dropdown__option" onClick={(e) => onOptionClick(e, value)}>
                <span dangerouslySetInnerHTML={{ __html: getLabel(label) }} />
              </li>
            ))}
            {list.length === 0 && (
              <li className="dropdown__option dropdown__option--no-result">
                {props.noResult || "Keine Versicherung gefunden."}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

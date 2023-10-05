import type { AttachmentSectionName } from "@types";
import { useEffect } from "react";
import { Element, scroller } from "react-scroll";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setActiveAttachmentSection } from "@redux/slice";
import { selectAttachmentSectionData } from "@redux/selectors";
import arrowBlueSrc from "/png/arrow-blue.png";
import "./attachment-sections.css";

export const AttachmentSections = () => {
  const { list, hasInsurance, activeSection } = useAppSelector(selectAttachmentSectionData);
  const dispatch = useAppDispatch();

  const titleCn = (name: AttachmentSectionName): string => {
    return cn("attachment-sections__title", {
      "attachment-sections__title--opened": name === activeSection,
      "attachment-sections__title--closed": name !== activeSection,
    });
  };

  useEffect(() => {
    if (activeSection === "survey" && hasInsurance) {
      scroller.scrollTo("insurance", {
        smooth: true,
        duration: 300,
        delay: 150,
        offset: -10,
      });
    }
  }, [activeSection]);

  return (
    <ul className="attachment-sections">
      {list.map((item: AttachmentSectionListItem, i: number) => (
        <li key={item.section.name} className="attachment-sections__item">
          <Element name={item.section.name}>
            <div className="attachment-sections__number">{i + 1}</div>
            <button
              className={titleCn(item.section.name)}
              onClick={() => dispatch(setActiveAttachmentSection(item.section.name))}
            >
              <span className="attachment-sections__text">{item.title}</span>
              <img alt="arrow" src={arrowBlueSrc} className="attachment-sections__arrow" />
            </button>
            <div className="attachment-sections__content">
              <hr className="attachment-sections__line" />
              <AnimateHeight
                duration={300}
                delay={150}
                animateOpacity
                easing="cubic-bezier(0.4, 0, 0.2, 1)"
                height={item.section.name === activeSection ? "auto" : 0}
              >
                {item.element}
              </AnimateHeight>
            </div>
          </Element>
        </li>
      ))}
    </ul>
  );
};

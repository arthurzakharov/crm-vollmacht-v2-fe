import { useEffect, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import { Logos } from "@atoms/logos";
import { StatusIcon } from "@atoms/status-icon";
import { SidebarInfo } from "@molecules/sidebar-info";
import { SubmitButton } from "@molecules/submit-button";
import { useAppSelector } from "@redux/store";
import { selectSidebarData } from "@redux/selectors";
import "./sidebar.css";

export const Sidebar = () => {
  const {
    currentPage,
    formStep,
    attachmentSectionNames,
    isBirthDateEmpty,
    isFormPersonalCorrect,
    isFormAddressCorrect,
    isCorrectInsurance,
    isCorrectFiles,
    isCorrectSurvey,
  } = useAppSelector(selectSidebarData);
  const [height, setHeight] = useState<Height>(0);

  const getHomeSteps = (): SidebarStep[] => [
    { key: "form-personal", title: "Angaben zur Person" },
    { key: "form-address", title: "Kontaktdaten" },
    { key: "form-checkout", title: "Vollmacht" },
  ];

  const getRemunerationSteps = (): SidebarStep[] =>
    isBirthDateEmpty
      ? [
          { key: "form-personal", title: "Angaben zur Person" },
          { key: "form-address", title: "Kontaktdaten" },
          { key: "form-remuneration", title: "Vergütungsvereinbarung" },
        ]
      : [{ key: "form-remuneration", title: "Vergütungsvereinbarung" }];

  const getAttachmentSteps = (): SidebarStep[] =>
    attachmentSectionNames.map((name) => {
      switch (name) {
        case "insurance":
          return { key: "form-insurance", title: "Rechtsschutzversicherung" };
        case "files":
          return { key: "form-files", title: "Behördenschreiben" };
        case "survey":
          return { key: "form-survey", title: "Weitere Informationen" };
      }
    });

  const getSteps = (): SidebarStep[] => {
    switch (currentPage) {
      case "home":
        return getHomeSteps();
      case "remuneration":
        return getRemunerationSteps();
      case "attachment":
        return getAttachmentSteps();
      default:
        return [];
    }
  };

  const getState = (formStep: FormStepType | AttachmentStep): boolean => {
    switch (formStep) {
      case "form-personal":
        return isFormPersonalCorrect;
      case "form-address":
        return isFormAddressCorrect;
      case "form-checkout":
        return false;
      case "form-remuneration":
        // TODO: update with remuneration validation icon-success
        return false;
      case "form-insurance":
        return isCorrectInsurance;
      case "form-files":
        return isCorrectFiles;
      case "form-survey":
        return isCorrectSurvey;
    }
  };

  useEffect(() => {
    setHeight(formStep === "form-checkout" ? "auto" : 0);
  }, [formStep]);

  return (
    <div className="sidebar">
      <h6 className="sidebar__title">Ihre Übersicht</h6>
      <div className="sidebar__steps">
        {getSteps().map((step, index) => (
          <div className="sidebar__step" key={step.key}>
            <p>
              {index + 1}. {step.title}
            </p>
            <StatusIcon idle={!getState(step.key)} status="success" size="s" />
          </div>
        ))}
      </div>
      <SidebarInfo />
      {currentPage !== "attachment" && (
        <AnimateHeight duration={250} delay={125} animateOpacity easing="cubic-bezier(0.4, 0, 0.2, 1)" height={height}>
          <div className="sidebar__button">
            <SubmitButton isSidebarVersion />
          </div>
        </AnimateHeight>
      )}
      {currentPage === "attachment" ? (
        <div className="sidebar__timetable">
          <p className="sidebar__info">Sekreteriat Öffnungszeiten</p>
          <p>Mo – Do: 8:30 Uhr bis 17 Uhr</p>
          <p>Fr: 8:30 Uhr bis 16 Uhr</p>
        </div>
      ) : null}
      <div className="sidebar__logos">
        <Logos />
      </div>
    </div>
  );
};

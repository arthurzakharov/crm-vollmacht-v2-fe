import { ReactNode, useEffect, useState } from "react";
import { Element, scroller } from "react-scroll";
import { Loader } from "@atoms/loader";
import { AttachmentSuccess } from "@atoms/attachment-success";
import { Question } from "@organisms/question";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  setAdditionalInformation,
  setAdditionalLegalInsurance,
  setAdditionalLegalInsuranceExtended,
  setCarOwner,
  setCarOwnerExtended,
  setIsCorrectSurvey,
  setRelationshipOwnerDriver,
  setWaiverOnDrivingBanImportant,
  setWaiverOnDrivingBanImportantExtended,
} from "@redux/slice";
import { selectSurveyData } from "@redux/selectors";
import { thunkPostClientSurvey } from "@redux/thunks";
import "./survey.css";

export const Survey = () => {
  const [activeQuestion, setActiveQuestion] = useState<SurveyQuestion>("carOwner");
  const [order, setOrder] = useState<SurveyQuestion[]>([
    "carOwner",
    "additionalLegalInsurance",
    "waiverOnDrivingBanImportant",
    "additionalInformation",
  ]);
  const {
    carOwner,
    carOwnerExtended,
    relationshipOwnerDriver,
    additionalInformation,
    additionalLegalInsurance,
    additionalLegalInsuranceExtended,
    waiverOnDrivingBanImportant,
    waiverOnDrivingBanImportantExtended,
    status,
  } = useAppSelector(selectSurveyData);
  const dispatch = useAppDispatch();

  const submitInsuranceAndGoToNextSection = (): void => {
    dispatch(thunkPostClientSurvey());
  };

  const goNextToOrder = (question: SurveyQuestion, order: SurveyQuestion[]): void => {
    const currentIndex = order.indexOf(question);
    if (currentIndex >= 0 && currentIndex < order.length - 1) {
      setActiveQuestion(order[currentIndex + 1]);
    }
    if (currentIndex === order.length - 1) {
      submitInsuranceAndGoToNextSection();
    }
  };

  const getUpdateOrder = (question: SurveyQuestion, updatedPath: SurveyQuestion[]): SurveyQuestion[] => {
    const currentIndex = order.indexOf(question);
    return currentIndex >= 0 ? [...order.slice(0, currentIndex + 1), ...updatedPath] : [];
  };

  const updateQuestionAnswer = (value: string, question: SurveyQuestion): void => {
    if (question === "carOwner" && value === "true") {
      const updatedOrder = getUpdateOrder(question, [
        "additionalLegalInsurance",
        "waiverOnDrivingBanImportant",
        "additionalInformation",
      ]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setCarOwner(value));
    }
    if (question === "carOwner" && value === "false") {
      const updatedOrder = getUpdateOrder(question, [
        "carOwnerExtended",
        "relationshipOwnerDriver",
        "additionalLegalInsurance",
        "waiverOnDrivingBanImportant",
        "additionalInformation",
      ]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setCarOwner(value));
    }
    if (question === "carOwnerExtended") {
      dispatch(setCarOwnerExtended(value));
    }
    if (question === "relationshipOwnerDriver") {
      goNextToOrder(question, order);
      dispatch(setRelationshipOwnerDriver(value));
    }
    if (question === "additionalLegalInsurance" && value === "true") {
      const updatedOrder = getUpdateOrder(question, [
        "additionalLegalInsuranceExtended",
        "waiverOnDrivingBanImportant",
        "additionalInformation",
      ]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setAdditionalLegalInsurance(value));
    }
    if (question === "additionalLegalInsurance" && value === "false") {
      const updatedOrder = getUpdateOrder(question, ["waiverOnDrivingBanImportant", "additionalInformation"]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setAdditionalLegalInsurance(value));
    }
    if (question === "additionalLegalInsuranceExtended") {
      dispatch(setAdditionalLegalInsuranceExtended(value));
    }
    if (question === "waiverOnDrivingBanImportant" && value === "true") {
      const updatedOrder = getUpdateOrder(question, ["waiverOnDrivingBanImportantExtended", "additionalInformation"]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setWaiverOnDrivingBanImportant(value));
    }
    if (question === "waiverOnDrivingBanImportant" && value === "false") {
      const updatedOrder = getUpdateOrder(question, ["additionalInformation"]);
      goNextToOrder(question, updatedOrder);
      setOrder(updatedOrder);
      dispatch(setWaiverOnDrivingBanImportant(value));
    }
    if (question === "waiverOnDrivingBanImportantExtended") {
      goNextToOrder(question, order);
      dispatch(setWaiverOnDrivingBanImportantExtended(value));
    }
    if (question === "additionalInformation") {
      dispatch(setAdditionalInformation(value));
    }
  };

  const getQuestion = (question: SurveyQuestion): ReactNode => {
    switch (question) {
      case "carOwner":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="radio"
            order={order}
            active={activeQuestion}
            title="Ist das Fahrzeug auf Sie zugelassen?"
            name="carOwner"
            value={carOwner}
            options={[
              { label: "Ja", value: "true" },
              { label: "Nein", value: "false" },
            ]}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "carOwnerExtended":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="text"
            order={order}
            active={activeQuestion}
            title="Wer ist der Fahrzeughalter"
            placeholder="Vor- und Nachname / Firma"
            name="carOwnerExtended"
            value={carOwnerExtended}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "relationshipOwnerDriver":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="dropdown"
            isSearchHidden
            order={order}
            active={activeQuestion}
            title="Beziehung Fahrzeughalter und -führer"
            name="relationshipOwnerDriver"
            placeholder="Beziehung Fahrzeughalter/-führer auswählen..."
            value={relationshipOwnerDriver}
            options={[
              {
                label: "Elternteil - Tochter/Sohn",
                value: "Elternteil - Tochter/Sohn",
              },
              { label: "Eheleute", value: "Eheleute" },
              { label: "Lebenspartner", value: "Lebenspartner" },
              {
                label: "Arbeitsverhältnis (Firmenfahrzeug)",
                value: "Arbeitsverhältnis (Firmenfahrzeug)",
              },
              { label: "Sonstiges", value: "Sonstiges" },
            ]}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "additionalLegalInsurance":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="radio"
            order={order}
            active={activeQuestion}
            title="Weitere Rechtsschutzversicherungen?"
            description="Im Rahmen der Kostendeckungsanfrage stellen Versicherungsunternehmen die Frage nach einer weiteren Rechtsschutzversicherung. Besteht für das betroffene Fahrzeug eine weitere (Firmen-) Rechtsschutzversicherung?"
            name="additionalLegalInsurance"
            value={additionalLegalInsurance}
            options={[
              { label: "Ja", value: "true" },
              { label: "Nein", value: "false" },
            ]}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "additionalLegalInsuranceExtended":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="text"
            order={order}
            active={activeQuestion}
            title="Versicherungsinformationen (falls zur Hand)"
            placeholder="Weitere Versicherung"
            name="additionalLegalInsuranceExtended"
            value={additionalLegalInsuranceExtended}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "waiverOnDrivingBanImportant":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="radio"
            order={order}
            active={activeQuestion}
            title="Droht ein Fahrverbot?"
            name="waiverOnDrivingBanImportant"
            value={waiverOnDrivingBanImportant}
            options={[
              { label: "Ja", value: "true" },
              { label: "Nein", value: "false" },
            ]}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "waiverOnDrivingBanImportantExtended":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="dropdown"
            isSearchHidden
            order={order}
            active={activeQuestion}
            title="Ist Ihnen der Verzicht auf das Fahrverbot sehr wichtig?"
            name="waiverOnDrivingBanImportantExtended"
            value={waiverOnDrivingBanImportantExtended}
            options={[
              {
                label: "Nein, es ist mir nicht so wichtig, ich könnte z.B. meinen Urlaub zu der Zeit planen",
                value: "false",
              },
              {
                label: "Ja, es ist mir sehr wichtig - auch gegen Verdoppelung des Bußgeldes",
                value: "true",
              },
            ]}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "additionalInformation":
        return (
          <Question<SurveyQuestion>
            status="neutral"
            type="textarea"
            rows={3}
            order={order}
            active={activeQuestion}
            title="Haben Sie weitere Informationen, die Sie für wichtig halten/uns mitteilen wollen?"
            name="additionalInformation"
            value={additionalInformation}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
    }
  };

  useEffect(() => {
    if (status === "fulfilled") {
      const surveySuccessElement = document.querySelector(".survey__success") as HTMLElement;
      const sibling = surveySuccessElement && (surveySuccessElement.previousElementSibling as HTMLElement);
      if (surveySuccessElement && sibling) sibling.remove();
      dispatch(setIsCorrectSurvey(true));
    }
  }, [status]);

  useEffect(() => {
    const isText = !!document.querySelector(`.question--${activeQuestion}.question--text`);
    const isTextarea = !!document.querySelector(`.question--${activeQuestion}.question--textarea`);
    if (isText || isTextarea) {
      const selector = `#${activeQuestion}[name="${activeQuestion}"]`;
      const element = document.querySelector(selector) as HTMLElement;
      element && element.focus();
    }
    setTimeout(() => {
      scroller.scrollTo(activeQuestion, {
        smooth: true,
        duration: 300,
        offset: -5,
      });
    }, 150);
  }, [activeQuestion]);

  return status !== "fulfilled" ? (
    <div className="survey">
      <div data-loading={status === "pending"} className="survey__content">
        <p className="survey__description">
          Bitte teilen Sie uns alle wichtigen Informationen zum Fahrer und Fahrzeughalter mit.
        </p>
        <div className="survey__questions">
          {order.map((question: SurveyQuestion) => (
            <Element key={question} name={question} data-id={question} className="survey__question">
              {getQuestion(question)}
            </Element>
          ))}
        </div>
      </div>
      {status === "pending" && (
        <div className="survey__loading">
          <Loader color="orange" />
        </div>
      )}
    </div>
  ) : (
    <AttachmentSuccess />
  );
};

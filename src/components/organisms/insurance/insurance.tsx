import { ReactNode, useState } from "react";
import { Loader } from "@atoms/loader";
import { Question } from "@organisms/question";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setInsuranceName, setInsuranceNumber } from "@redux/slice";
import { selectInsuranceData } from "@redux/selectors";
import { thunkPostInsuranceInformation } from "@redux/thunks";
import { INSURANCE_OPTIONS } from "./list";
import "./insurance.css";

export const Insurance = () => {
  const [activeQuestion, setActiveQuestion] = useState<InsuranceQuestion>("insuranceName");
  const [order] = useState<InsuranceQuestion[]>(["insuranceName", "insuranceNumber"]);
  const { name, number, status } = useAppSelector(selectInsuranceData);
  const dispatch = useAppDispatch();

  const submitInsuranceAndGoToNextSection = async (): Promise<void> => {
    await dispatch(thunkPostInsuranceInformation());
  };

  const goNextToOrder = async (question: InsuranceQuestion, order: InsuranceQuestion[]): Promise<void> => {
    const currentIndex = order.indexOf(question);
    if (currentIndex >= 0 && currentIndex < order.length - 1) {
      setActiveQuestion(order[currentIndex + 1]);
    }
    if (currentIndex === order.length - 1) {
      await submitInsuranceAndGoToNextSection();
    }
    if (question === "insuranceName") {
      const insuranceNumberInput = document.getElementById("insuranceNumber");
      setTimeout(() => insuranceNumberInput && insuranceNumberInput.focus(), 150);
    }
  };

  const updateQuestionAnswer = async (value: string, question: InsuranceQuestion): Promise<void> => {
    if (question === "insuranceName") {
      await goNextToOrder(question, order);
      dispatch(setInsuranceName(value));
    }
    if (question === "insuranceNumber") {
      dispatch(setInsuranceNumber(value));
    }
  };

  const getQuestion = (question: InsuranceQuestion): ReactNode => {
    switch (question) {
      case "insuranceName":
        return (
          <Question<InsuranceQuestion>
            status={name ? "success" : "neutral"}
            required
            order={order}
            active={activeQuestion}
            title="Ihre Rechtsschutzversicherung"
            placeholder="Wählen Sie Ihre Versicherung..."
            name="insuranceName"
            value={name}
            type="dropdown"
            options={INSURANCE_OPTIONS}
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
      case "insuranceNumber":
        return (
          <Question<InsuranceQuestion>
            status="neutral"
            order={order}
            active={activeQuestion}
            title="Versichertennummer (falls zur Hand)"
            placeholder="Ihre Versichertennummer"
            name="insuranceNumber"
            value={number}
            type="text"
            onChange={updateQuestionAnswer}
            onAnsweredClick={setActiveQuestion}
            onNext={goNextToOrder}
          />
        );
    }
  };

  return (
    <div className="insurance">
      <div data-loading={status === "pending"} className="insurance__content">
        <p className="insurance__description">
          Haben Sie Ihre <strong>Rechtsschutzversicherungsdaten</strong> zur Hand? Teilen Sie uns diese mit, damit wir
          für Sie die Kostenübernahme bei Ihrer Versicherung anfragen können.
        </p>
        <div className="insurance__questions">
          {order.map((question: InsuranceQuestion) => (
            <div key={question} className="insurance__question">
              {getQuestion(question)}
            </div>
          ))}
        </div>
      </div>
      {status === "pending" && (
        <div className="insurance__loading">
          <Loader color="orange" />
        </div>
      )}
    </div>
  );
};

import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { customerInfoData } from "@redux/selectors";
import { setFormStep } from "@redux/slice";
import penSrc from "/png/pen.png";
import "./customer-info.css";

export interface ICustomerInfo {
  version: "form" | "sidebar";
}

export const CustomerInfo = (props: ICustomerInfo) => {
  const {
    firstName,
    lastName,
    birthName,
    birthDate,
    birthCity,
    street,
    houseNumber,
    postCode,
    city,
    isBirthDateEmpty,
    formStep,
  } = useAppSelector(customerInfoData);
  const dispatch = useAppDispatch();

  const isEditButtonVisible = (): boolean => {
    return (formStep === "form-remuneration" || formStep === "form-checkout") && isBirthDateEmpty;
  };

  const goToFormPersonal = (): void => {
    dispatch(setFormStep("form-personal"));
  };

  const customerInfoCn = (): string => {
    return cn("customer-info", {
      "customer-info--sidebar": props.version === "sidebar",
    });
  };

  return (
    <div className={customerInfoCn()}>
      <div className="customer-info__navigation">
        Ihre Angaben
        {isEditButtonVisible() && (
          <button className="customer-info__button" onClick={goToFormPersonal}>
            <span className="customer-info__text">ändern</span>
            <img alt="pen-icon" src={penSrc} className="customer-info__icon" />
          </button>
        )}
      </div>
      <p>
        {firstName} {lastName} {birthName}
      </p>
      <p>
        Geb {birthDate} in {birthCity}
      </p>
      <p>
        {street} {houseNumber}, {postCode} {city}
      </p>
    </div>
  );
};

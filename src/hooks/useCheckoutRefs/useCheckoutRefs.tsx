import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectUseCheckoutRefs } from "@redux/selectors";
import { setCheckoutErrors, setCheckoutMandatory } from "@redux/slice";

export const useCheckoutRefs = () => {
  const {
    currentPage,
    isOldCheckoutShown,
    isNewCheckoutShown,
    checkoutMandatory,
    checkoutSubmitClickCount,
    checkoutIsMoneySectionShown,
    remunerationAgreement,
    powerOfAttorneyAgreement,
    agreedToLawInsuranceRequest,
    signature,
    checkoutFieldsState,
  } = useAppSelector(selectUseCheckoutRefs);
  const dispatch = useAppDispatch();

  const setInitialMandatory = () => {
    if (currentPage === "home" && isNewCheckoutShown) {
      dispatch(
        setCheckoutMandatory([
          "remunerationAgreement",
          "agreedToLawInsuranceRequest",
          "powerOfAttorneyAgreement",
          "signature",
        ]),
      );
    }
    if (currentPage === "home" && isOldCheckoutShown) {
      dispatch(
        setCheckoutMandatory([
          "remunerationAgreement",
          "agreedToLawInsuranceRequest",
          "powerOfAttorneyAgreement",
          "signature",
        ]),
      );
    }
    if (currentPage === "remuneration") {
      dispatch(setCheckoutMandatory(["remunerationAgreement", "signature"]));
    }
  };

  const scrollToUpperFailedCheckoutField = () => {
    const elements = (Object.keys(checkoutFieldsState) as CheckoutField[])
      .filter((k) => checkoutFieldsState[k] === "error")
      .map((checkoutFailedRequiredField) => document.querySelector(`[data-id="${checkoutFailedRequiredField}"]`));
    const topElement = elements
      .map((r) => ({ ref: r, pos: r ? r.getBoundingClientRect().top : 0 }))
      .sort((a, b) => a.pos - b.pos)
      .map((r) => r.ref)
      .slice(0, 1)[0];
    if (topElement) topElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getErrors = () => {
    return checkoutMandatory
      .filter((field) => document.querySelectorAll(`[data-id="${field}"]`).length > 0)
      .filter((field) => {
        switch (field) {
          case "powerOfAttorneyAgreement":
            return !powerOfAttorneyAgreement;
          case "agreedToLawInsuranceRequest":
            return !agreedToLawInsuranceRequest;
          case "dropRevocationAgreement":
            return false;
          case "remunerationAgreement":
            return !remunerationAgreement;
          case "signature":
            return signature === "";
          default:
            return false;
        }
      });
  };

  useEffect(() => {
    setInitialMandatory();
  }, []);

  useEffect(() => {
    dispatch(setCheckoutErrors(getErrors()));
  }, [
    powerOfAttorneyAgreement,
    agreedToLawInsuranceRequest,
    remunerationAgreement,
    signature,
    checkoutSubmitClickCount,
    checkoutIsMoneySectionShown,
  ]);

  useEffect(() => {
    scrollToUpperFailedCheckoutField();
  }, [checkoutSubmitClickCount]);
};

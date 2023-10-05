import { useEffect, KeyboardEvent } from "react";
import { WarningNotice } from "@atoms/warning-notice";
import { SubmitButton } from "@molecules/submit-button";
import { InputCheckbox } from "@molecules/input-checkbox";
import { Signature } from "@molecules/signature";
import { oneOf } from "@utils/application";
import { useCheckoutRefs } from "@hooks/useCheckoutRefs";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectCheckoutOldPartData } from "@redux/selectors";
import {
  openDialog,
  setAgreedToLawInsuranceRequest,
  setCheckoutIsMoneySectionShown,
  setDropRevocationAgreement,
  setIsLeadSwitched,
  setPowerOfAttorneyAgreement,
  setRemunerationAgreement,
} from "@redux/slice";
import "./checkout-old-part.css";

export const CheckoutOldPart = () => {
  useCheckoutRefs();
  const {
    caseGroupLawyerNames,
    total,
    switchTotal,
    poaType,
    variation,
    isLeadSwitched,
    noBoxOnStrafsachen,
    isMoneySectionShown,
    remunerationAgreement,
    dropRevocationAgreement,
    agreedToLawInsuranceRequest,
    powerOfAttorneyAgreement,
    remunerationAgreementStatus,
    dropRevocationAgreementStatus,
    agreedToLawInsuranceRequestStatus,
    powerOfAttorneyAgreementStatus,
  } = useAppSelector(selectCheckoutOldPartData);
  const dispatch = useAppDispatch();

  const isA = (): boolean => variation === "a";

  const isC = (): boolean => variation === "c";

  const isAC = (): boolean => isA() || isC();

  const getTotal = (): number =>
    oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isC() ? switchTotal : total;

  const isAgreedToLawInsuranceRequestVisible = () => {
    const con1 = oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isAC() && !isMoneySectionShown;
    const con2 = oneOf(["insuranceArag", "insuranceAragVerso"], poaType) && isAC();
    const con3 =
      oneOf(
        [
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceAragUncertain",
          "insuranceAragUncertain500",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      ) &&
      isAC() &&
      !isMoneySectionShown;
    return con1 || con2 || con3;
  };

  const isExpensesVisible = () => {
    const con1 =
      oneOf(
        [
          "noInsurance",
          "noInsurance500",
          "noInsuranceA",
          "insuranceB",
          "alcohol400",
          "alcohol500",
          "alcohol1000",
          "noInsuranceDiscounted",
          "withoutRsv400Court",
          "RA250",
          "RA300",
          "RA400",
          "RA500",
          "RA700",
          "RA1000",
        ],
        poaType,
      ) &&
      isAC() &&
      isMoneySectionShown;
    const con2 =
      oneOf(
        [
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceAragUncertain",
          "insuranceAragUncertain500",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      ) &&
      isAC() &&
      isMoneySectionShown;
    const con3 = oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isC() && isMoneySectionShown;
    return con1 || con2 || con3;
  };

  const isWarningVisible = (): boolean => {
    const con1 =
      oneOf(
        [
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceAragUncertain",
          "insuranceAragUncertain500",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      ) &&
      isAC() &&
      !isMoneySectionShown;
    const con2 = oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isA();
    const con3 = oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isC() && !isMoneySectionShown;
    const con4 = oneOf(["insuranceArag", "insuranceAragVerso"], poaType) && isAC();
    return con1 || con2 || con3 || con4;
  };

  const isQuestionVisible = (): boolean =>
    oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isC() && !isMoneySectionShown;

  const isExpensesWarningVisible = (): boolean => {
    const con1 =
      oneOf(
        [
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceAragUncertain",
          "insuranceAragUncertain500",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      ) &&
      isAC() &&
      isMoneySectionShown;
    const con2 = oneOf(["insurance", "insuranceA", "insuranceB"], poaType) && isC() && isMoneySectionShown;
    return con1 || con2;
  };

  const onButtonQuestionClick = (): void => {
    dispatch(setCheckoutIsMoneySectionShown(!isMoneySectionShown));
    dispatch(setIsLeadSwitched(!isLeadSwitched));
  };

  const onButtonExpensesClick = (): void => {
    dispatch(setCheckoutIsMoneySectionShown(!isMoneySectionShown));
    dispatch(setIsLeadSwitched(!isLeadSwitched));
  };

  const onLawyerNameKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") {
      dispatch(openDialog({ dialog: "compensation-agreement" }));
    }
  };

  useEffect(() => {
    if (
      oneOf(
        [
          "noInsurance",
          "noInsuranceA",
          "noInsuranceB",
          "noInsurance500",
          "alcohol400",
          "alcohol500",
          "alcohol1000",
          "noInsuranceDiscounted",
          "withoutRsv400Court",
          "RA250",
          "RA300",
          "RA400",
          "RA500",
          "RA700",
          "RA1000",
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceAragUncertain",
          "insuranceAragUncertain500",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      )
    ) {
      dispatch(setCheckoutIsMoneySectionShown(true));
    }
  }, [poaType]);

  return (
    <div className="checkout-old-part">
      <div className="checkout-old-part__checkboxes">
        <InputCheckbox
          labelSize="s"
          status={powerOfAttorneyAgreementStatus}
          name="powerOfAttorneyAgreement"
          value={powerOfAttorneyAgreement}
          onChange={() => dispatch(setPowerOfAttorneyAgreement(!powerOfAttorneyAgreement))}
        >
          Hiermit beauftrage und bevollmächtige ich die Mathis Ruff Rechtsanwaltsgesellschaft mbH, Sonnenallee 260/262,
          12057 Berlin mit der Vertretung und Verteidigung in Straf- und Bußgeldsachen einschließlich der Vorverfahren
          und erteile hierzu den Rechtsanwälten {caseGroupLawyerNames} der Kanzlei Vollmacht. Die Vollmacht gilt für
          alle Instanzen und umfasst insbesondere die{" "}
          <button onClick={() => dispatch(openDialog({ dialog: "powers" }))}>Befugnisse</button>, die sie für meine
          Vertretung benötigen.
        </InputCheckbox>
        {isAgreedToLawInsuranceRequestVisible() && (
          <InputCheckbox
            labelSize="s"
            status={agreedToLawInsuranceRequestStatus}
            name="agreedToLawInsuranceRequest"
            value={agreedToLawInsuranceRequest}
            onChange={() => dispatch(setAgreedToLawInsuranceRequest(!agreedToLawInsuranceRequest))}
          >
            Hiermit bestätige ich, dass die Mathis Ruff Rechtsanwaltsgesellschaft mbH nach dem
            Rechtsanwaltsvergütungsgesetz und direkt mit meiner Rechtsschutzversicherung abrechnen darf.
          </InputCheckbox>
        )}
        <InputCheckbox
          labelSize="s"
          status={dropRevocationAgreementStatus}
          name="dropRevocationAgreement"
          value={dropRevocationAgreement}
          onChange={() => dispatch(setDropRevocationAgreement(!dropRevocationAgreement))}
        >
          Ich bin damit einverstanden und verlange ausdrücklich, dass die beauftragten Rechtsanwälte der Kanzlei Mathis
          Ruff Rechtsanwaltsgesellschaft mbH vor dem Ende der Widerrufsfrist mit der Ausführung der Dienstleistung
          sofort beginnen.
        </InputCheckbox>
      </div>
      <div className="checkout-old-part__signature">
        <Signature />
      </div>
      {isExpensesVisible() && (
        <div className="checkout-old-part__expenses">
          <h6 className="checkout-old-part__expenses-title">Kostenübersicht</h6>
          <p className="checkout-old-part__expenses-info">
            {/* TODO: button is always on new line */}
            {oneOf(["withoutRsv400Court", "alcohol400", "RA1000"], poaType) ? (
              <>
                Für die gerichtliche Vertretung und Wahrnehmung eines Hauptverhandlungstermins in der von Ihnen
                angegebenen Angelegenheit erhält die{" "}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch(openDialog({ dialog: "compensation-agreement" }))}
                  onKeyDown={onLawyerNameKeyDown}
                >
                  Mathis Ruff Rechtsanwaltsgesellschaft mbH
                </div>{" "}
                eine pauschale Vergütung in folgender Höhe:
              </>
            ) : (
              <>
                Für die außergerichtliche Vertretung in der von Ihnen angegebenen Angelegenheit erhält die{" "}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch(openDialog({ dialog: "compensation-agreement" }))}
                  onKeyDown={onLawyerNameKeyDown}
                >
                  Mathis Ruff Rechtsanwaltsgesellschaft mbH
                </div>{" "}
                eine pauschale Vergütung in folgender Höhe
              </>
            )}
          </p>
          <div className="checkout-old-part__expenses-price">
            <span>Pauschale Vergütung inkl. Steuern</span>
            <span>{getTotal()},00 €</span>
          </div>
          {isExpensesWarningVisible() && (
            <div className="checkout-old-part__expenses-warning">
              <p>Sind Sie doch rechtsschutzversichert?</p>
              <button onClick={onButtonExpensesClick}>Dann klicken Sie hier.</button>
            </div>
          )}
          <div className="checkout-old-part__expenses-checkbox">
            <InputCheckbox
              labelSize="s"
              status={remunerationAgreementStatus}
              name="remunerationAgreement"
              value={remunerationAgreement}
              onChange={() => dispatch(setRemunerationAgreement(!remunerationAgreement))}
            >
              Die{" "}
              <button
                onClick={() =>
                  dispatch(
                    openDialog({
                      dialog: "compensation-agreement-on-penalties",
                    }),
                  )
                }
              >
                Vergütungsvereinbarung
              </button>{" "}
              habe ich zur Kenntnis genommen und stimme dieser mit obiger Unterschrift ebenfalls zu.
            </InputCheckbox>
          </div>
        </div>
      )}
      {isWarningVisible() && !noBoxOnStrafsachen && (
        <div className="checkout-old-part__warning">
          <WarningNotice />
        </div>
      )}
      <div className="checkout-old-part__button">
        <SubmitButton />
      </div>
      {isQuestionVisible() && (
        <div className="checkout-old-part__question">
          <p>Doch nicht rechtsschutzversichert?</p>
          <button className="checkout-old-part__question-button" onClick={onButtonQuestionClick}>
            Dann klicken Sie hier.
          </button>
        </div>
      )}
    </div>
  );
};

import { ChangeEvent, useEffect, useState, MouseEvent, KeyboardEvent } from "react";
import { Radio } from "@atoms/radio";
import { WarningNotice } from "@atoms/warning-notice";
import { InputCheckbox } from "@molecules/input-checkbox";
import { selectCoverageSelectorData } from "@redux/selectors";
import { openDialog, setAgreedToLawInsuranceRequest, setCoverage, setRemunerationAgreement } from "@redux/slice";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { oneOf } from "@utils/application";
import "./coverage-selector.css";

type CoverageOption = {
  key: Coverage;
  label: string;
};

const COVERAGES: CoverageOption[] = [
  {
    key: "self-pay",
    label: "Ich möchte die Verfahrens&shy;gebühren selbst bezahlen",
  },
  {
    key: "arag-protection",
    label: "Ich möchte den ARAG Rechts&shy;schutz in Anspruch nehmen",
  },
  {
    key: "legal-pay",
    label: "Ich möchte über meine Rechts&shy;schutzversicherung abrechnen",
  },
];

export const CoverageSelector = () => {
  const {
    total,
    switchTotal,
    poaType,
    coverage,
    remunerationAgreement,
    agreedToLawInsuranceRequest,
    remunerationAgreementStatus,
    agreedToLawInsuranceRequestStatus,
  } = useAppSelector(selectCoverageSelectorData);
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<CoverageOption[]>(COVERAGES);
  const [initRemuneration, setInitRemuneration] = useState<boolean | null>(null);
  const [localRemuneration, setLocalRemuneration] = useState<boolean | null>(null);
  const [initAgreed, setInitAgreed] = useState<boolean | null>(null);
  const [localAgreed, setLocalAgreed] = useState<boolean | null>(null);

  const onOptionChange = (e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>, key: Coverage) => {
    e.preventDefault();
    dispatch(setCoverage(key));
  };

  const getTotal = () => {
    return oneOf(["insurance", "insuranceA", "insuranceB", "insuranceArag", "insuranceAragVerso"], poaType)
      ? switchTotal
      : total;
  };

  const setupOptions = (selectors: Coverage[], selected: Coverage) => {
    setOptions(selectors.map((selector) => COVERAGES.find((c) => c.key === selector) as CoverageOption));
    dispatch(setCoverage(selected));
  };

  const initialize = () => {
    if (oneOf(["noInsurance", "noInsurance500", "noInsuranceA", "noInsuranceB"], poaType)) {
      return setupOptions(["self-pay"], "self-pay");
    }

    if (
      oneOf(
        [
          "insuranceMaybe",
          "insuranceMaybe500",
          "insuranceUncertain500Automatic",
          "insuranceUncertain500DeutscheDirektVersicherung",
        ],
        poaType,
      )
    ) {
      return setupOptions(["self-pay", "legal-pay"], "self-pay");
    }

    if (oneOf(["insuranceAragUncertain", "insuranceAragUncertain500"], poaType)) {
      return setupOptions(["self-pay", "arag-protection"], "self-pay");
    }

    if (oneOf(["insurance", "insuranceA", "insuranceB"], poaType)) {
      return setupOptions(["legal-pay", "self-pay"], "legal-pay");
    }

    if (oneOf(["insuranceArag", "insuranceAragVerso"], poaType)) {
      return setupOptions(["arag-protection", "self-pay"], "arag-protection");
    }

    if (
      oneOf(
        [
          "alcohol400",
          "alcohol500",
          "alcohol1000",
          "withoutRsv400Court",
          "noInsuranceDiscounted",
          "RA250",
          "RA300",
          "RA400",
          "RA500",
          "RA700",
          "RA1000",
        ],
        poaType,
      )
    ) {
      return setupOptions(["self-pay"], "self-pay");
    }
  };

  const onAppear = (type: "agreedToLawInsuranceRequest" | "remunerationAgreement") => {
    if (type === "agreedToLawInsuranceRequest") {
      if (localAgreed === null || initRemuneration === null) return;
      dispatch(setAgreedToLawInsuranceRequest(localAgreed));
      dispatch(setRemunerationAgreement(initRemuneration));
    }
    if (type === "remunerationAgreement") {
      if (localRemuneration === null || initAgreed === null) return;
      dispatch(setRemunerationAgreement(localRemuneration));
      dispatch(setAgreedToLawInsuranceRequest(initAgreed));
    }
  };

  const onChangeOption = (type: "agreedToLawInsuranceRequest" | "remunerationAgreement") => {
    if (type === "agreedToLawInsuranceRequest") {
      setLocalAgreed(!agreedToLawInsuranceRequest);
      dispatch(setAgreedToLawInsuranceRequest(!agreedToLawInsuranceRequest));
    }
    if (type === "remunerationAgreement") {
      setLocalRemuneration(!remunerationAgreement);
      dispatch(setRemunerationAgreement(!remunerationAgreement));
    }
  };

  const onLawyerNameKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      dispatch(openDialog({ dialog: "compensation-agreement" }));
    }
  };

  const board = (option: Coverage | null) => {
    switch (option) {
      case "self-pay":
        return (
          <>
            {oneOf(["withoutRsv400Court", "alcohol1000", "RA1000"], poaType) ? (
              <div className="coverage-selector__text">
                Für die gerichtliche Vertretung und Wahrnehmung eines Hauptverhandlungstermins in der von Ihnen
                angegebenen Angelegenheit erhält die{" "}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch(openDialog({ dialog: "compensation-agreement" }))}
                  onKeyDown={onLawyerNameKeyDown}
                >
                  Mathis Ruff Rechtsanwaltsgesellschaft mbH
                </span>{" "}
                eine pauschale Vergütung in folgender Höhe:
              </div>
            ) : (
              <div className="coverage-selector__text">
                Für die außergerichtlichen Vertretung in der von mir angegebenen Angelegenheit erhält die{" "}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch(openDialog({ dialog: "compensation-agreement" }))}
                  onKeyDown={onLawyerNameKeyDown}
                >
                  Mathis Ruff Reschtsanwaltsgesellschaft mbH
                </span>{" "}
                eine pauschale Vergütung in folgender Höhe.
              </div>
            )}
            <div className="coverage-selector__price">
              <span>Pauschale Vergütung inkl. Steuern</span>
              <span>{getTotal()},00 €</span>
            </div>
            <InputCheckbox
              labelSize="s"
              status={remunerationAgreementStatus}
              name="remunerationAgreement"
              value={remunerationAgreement}
              onChange={() => onChangeOption("remunerationAgreement")}
            >
              Die{" "}
              <button
                type="button"
                tabIndex={0}
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
              habe ich zur Kenntnis genommen und stimme dieser zu.
            </InputCheckbox>
          </>
        );
      case "arag-protection":
        return (
          <>
            <WarningNotice />
            <hr className="coverage-selector__line" />
            <InputCheckbox
              labelSize="s"
              status={agreedToLawInsuranceRequestStatus}
              name="agreedToLawInsuranceRequest"
              value={agreedToLawInsuranceRequest}
              onChange={() => onChangeOption("agreedToLawInsuranceRequest")}
            >
              Hiermit bestätige ich, dass die Mathis Ruff Rechtsanwaltsgesellschaft mbH nach dem
              Rechtsanwaltsvergütungsgesetz und direkt mit meiner Rechtsschutzversicherung abrechnen darf.
            </InputCheckbox>
          </>
        );
      case "legal-pay":
        return (
          <>
            <WarningNotice />
            <hr className="coverage-selector__line" />
            <InputCheckbox
              labelSize="s"
              status={agreedToLawInsuranceRequestStatus}
              name="agreedToLawInsuranceRequest"
              value={agreedToLawInsuranceRequest}
              onChange={() => onChangeOption("agreedToLawInsuranceRequest")}
            >
              Hiermit bestätige ich, dass die Mathis Ruff Rechtsanwaltsgesellschaft mbH nach dem
              Rechtsanwaltsvergütungsgesetz und direkt mit meiner Rechtsschutzversicherung abrechnen darf.
            </InputCheckbox>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    initialize();
  }, [poaType]);

  useEffect(() => {
    if (initRemuneration === null) setInitRemuneration(remunerationAgreement);
  }, [remunerationAgreement]);

  useEffect(() => {
    if (initAgreed === null) setInitAgreed(agreedToLawInsuranceRequest);
  }, [agreedToLawInsuranceRequest]);

  useEffect(() => {
    switch (coverage) {
      case "self-pay":
        onAppear("remunerationAgreement");
        break;
      case "arag-protection":
        onAppear("agreedToLawInsuranceRequest");
        break;
      case "legal-pay":
        onAppear("agreedToLawInsuranceRequest");
        break;
      default:
        break;
    }
  }, [coverage]);

  return (
    <div className="coverage-selector">
      <div className="coverage-selector__options">
        {options.map(({ key, label }) => (
          <div key={key} className="coverage-selector__option-wrapper">
            <input
              name="coverage"
              id={key}
              value={key}
              type="radio"
              checked={key === coverage}
              className="coverage-selector__input"
              onChange={(e) => onOptionChange(e, key)}
            />
            <div className="coverage-selector__option" onClick={(e) => onOptionChange(e, key)}>
              <Radio value={key === coverage} size="s" status="neutral" />
              <label htmlFor={key} dangerouslySetInnerHTML={{ __html: label }} />
            </div>
          </div>
        ))}
      </div>
      <div className="coverage-selector__board">{board(coverage)}</div>
    </div>
  );
};

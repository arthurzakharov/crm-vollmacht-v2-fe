import { useEffect } from "react";
import { Logos } from "@atoms/logos";
import { SubmitButton } from "@molecules/submit-button";
import { InputCheckbox } from "@molecules/input-checkbox";
import { Signature } from "@molecules/signature";
import { useCheckoutRefs } from "@hooks/useCheckoutRefs";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { openDialog, setFormSubtitle, setRemunerationAgreement } from "@redux/slice";
import { selectFormRemunerationData } from "@redux/selectors";
import "./form-remuneration.css";

export const FormRemuneration = () => {
  useCheckoutRefs();
  const { total, birthDate, value, status } = useAppSelector(selectFormRemunerationData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subtitle = birthDate !== "" ? "1. Vergütungsvereinbarung" : "3. Vergütungsvereinbarung";
    dispatch(setFormSubtitle(subtitle));
  }, [birthDate]);

  return (
    <div className="form-remuneration">
      <p className="form-remuneration__text">
        Für die außergerichtlichen Vertretung in der von mir angegebenen Angelegenheit erhält die{" "}
        <span
          role="button"
          tabIndex={0}
          className="form-remuneration__link"
          onClick={() => dispatch(openDialog({ dialog: "compensation-agreement" }))}
        >
          Mathis Ruff Reschtsanwaltsgesellschaft mbH
        </span>{" "}
        eine pauschale Vergütung in folgender Höhe.
      </p>
      <div className="form-remuneration__expenses">
        <span>Pauschale Vergütung inkl. Steuern</span>
        <span>{total},00 €</span>
      </div>
      <div className="form-remuneration__checkbox">
        <InputCheckbox
          labelSize="s"
          status={status}
          name="remunerationAgreement"
          value={value}
          onChange={() => dispatch(setRemunerationAgreement(!value))}
        >
          Die{" "}
          <button
            type="button"
            tabIndex={0}
            onClick={() => dispatch(openDialog({ dialog: "compensation-agreement-on-penalties" }))}
          >
            Vergütungsvereinbarung
          </button>{" "}
          habe ich zur Kenntnis genommen und stimme dieser zu.
        </InputCheckbox>
      </div>
      <Signature />
      <div className="form-remuneration__button">
        <SubmitButton />
      </div>
      <div className="form-remuneration__info">
        Es gelten unsere{" "}
        <button type="button" tabIndex={0} onClick={() => dispatch(openDialog({ dialog: "mandate-condition" }))}>
          Mandatsbedingungen
        </button>
        . Hier finden Sie auch unsere{" "}
        <button type="button" tabIndex={0} onClick={() => dispatch(openDialog({ dialog: "right-for-refund" }))}>
          Widerrufsbelehrung
        </button>
        .
      </div>
      <div className="form-remuneration__logos">
        <Logos />
      </div>
    </div>
  );
};

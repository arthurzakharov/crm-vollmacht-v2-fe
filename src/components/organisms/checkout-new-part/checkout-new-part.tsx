import { SubmitButton } from "@molecules/submit-button";
import { InputCheckbox } from "@molecules/input-checkbox";
import { Signature } from "@molecules/signature";
import { CoverageSelector } from "@organisms/coverage-selector";
import { useCheckoutRefs } from "@hooks/useCheckoutRefs";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectCheckoutNewPartData } from "@redux/selectors";
import { setDropRevocationAgreement, setPowerOfAttorneyAgreement, openDialog } from "@redux/slice";
import "./checkout-new-part.css";

export const CheckoutNewPart = () => {
  useCheckoutRefs();
  const {
    caseGroupLawyerNames,
    powerOfAttorneyAgreement,
    dropRevocationAgreement,
    powerOfAttorneyAgreementStatus,
    dropRevocationAgreementStatus,
  } = useAppSelector(selectCheckoutNewPartData);
  const dispatch = useAppDispatch();

  return (
    <div className="checkout-new-part">
      <div className="checkout-new-part__checkboxes">
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
      <div className="checkout-new-part__selector">
        <CoverageSelector />
      </div>
      <div className="checkout-new-part__signature">
        <Signature />
      </div>
      <div className="checkout-new-part__button">
        <SubmitButton />
      </div>
    </div>
  );
};

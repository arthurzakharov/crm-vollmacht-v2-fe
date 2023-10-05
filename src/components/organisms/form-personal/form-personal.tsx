import { useEffect } from "react";
import { FormNavigationButton } from "@atoms/form-navigation-button";
import { InputRadio } from "@molecules/input-radio";
import { InputText } from "@molecules/input-text";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  setFormPersonalKey,
  setFormStep,
  setFormSubtitle,
  setPersonalFormIsDirty,
  setTouchedPersonalFormKeys,
} from "@redux/slice";
import { selectFormPersonalData } from "@redux/selectors";
import "./form-personal.css";

export const FormPersonal = () => {
  const {
    currentPage,
    isBirthDateEmpty,
    isFormPersonalCorrect,
    formPersonalStatus,
    salutation,
    firstName,
    lastName,
    birthName,
    birthDate,
    birthCity,
  } = useAppSelector(selectFormPersonalData);
  const dispatch = useAppDispatch();

  const goForward = (): void => {
    dispatch(setPersonalFormIsDirty(true));
    if (isFormPersonalCorrect) dispatch(setFormStep("form-address"));
  };

  const areInputsDisabled = (): boolean => currentPage === "remuneration" && isBirthDateEmpty;

  useEffect(() => {
    dispatch(setFormSubtitle("1. Angaben zur Person"));
  }, []);

  return (
    <div className="form-personal">
      <div className="form-personal__content">
        <div className="form-personal__row">
          <InputRadio
            status={formPersonalStatus.salutation}
            sizeLabel="s"
            sizeRadio="l"
            disabled={areInputsDisabled()}
            options={[
              { value: "male", label: "Herr" },
              { value: "female", label: "Frau" },
            ]}
            value={salutation}
            name="salutation"
            onChange={(value) => dispatch(setFormPersonalKey({ key: "salutation", value }))}
          />
        </div>
        <div className="form-personal__row">
          <InputText
            status={formPersonalStatus.firstName}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihren korrekten Vorname ein."
            label="Vorname"
            name="firstName"
            placeholder="Vorname"
            value={firstName}
            disabled={areInputsDisabled()}
            onBlur={() => dispatch(setTouchedPersonalFormKeys("firstName"))}
            onChange={(value) => dispatch(setFormPersonalKey({ key: "firstName", value }))}
          />
          <InputText
            status={formPersonalStatus.lastName}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihren korrekten Nachname ein."
            label="Nachname"
            name="lastName"
            placeholder="Nachname"
            value={lastName}
            disabled={areInputsDisabled()}
            onBlur={() => dispatch(setTouchedPersonalFormKeys("lastName"))}
            onChange={(value) => dispatch(setFormPersonalKey({ key: "lastName", value }))}
          />
        </div>
        <div className="form-personal__row">
          <InputText
            status={formPersonalStatus.birthName}
            labelSize="s"
            iconSize="l"
            color="blue"
            label="Geburtsname"
            name="birthName"
            placeholder="Geburtsname"
            value={birthName}
            disabled={areInputsDisabled()}
            onBlur={() => dispatch(setTouchedPersonalFormKeys("birthName"))}
            onChange={(value) => dispatch(setFormPersonalKey({ key: "birthName", value }))}
          />
        </div>
        <div className="form-personal__row">
          <InputText
            masked
            status={formPersonalStatus.birthDate}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihr korrektes Geburtsdatum ein."
            label="Geburtsdatum"
            name="birthDate"
            placeholder="Geburtsdatum"
            value={birthDate}
            onBlur={() => dispatch(setTouchedPersonalFormKeys("birthDate"))}
            onChange={(value) => dispatch(setFormPersonalKey({ key: "birthDate", value }))}
          />
          <InputText
            status={formPersonalStatus.birthCity}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihren korrekten Geburtsort ein."
            label="Geburtsort"
            name="birthCity"
            placeholder="Geburtsort"
            value={birthCity}
            disabled={areInputsDisabled()}
            onBlur={() => dispatch(setTouchedPersonalFormKeys("birthCity"))}
            onChange={(value) => dispatch(setFormPersonalKey({ key: "birthCity", value }))}
          />
        </div>
      </div>
      <div className="form-personal__action">
        <FormNavigationButton type="forward" onClick={goForward} />
      </div>
    </div>
  );
};

import { useEffect } from "react";
import { FormNavigationButton } from "@atoms/form-navigation-button";
import { InputText } from "@molecules/input-text";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  setAddressFormIsDirty,
  setFormAddressKey,
  setFormStep,
  setFormSubtitle,
  setTouchedAddressFormKeys,
} from "@redux/slice";
import { selectFormAddressData } from "@redux/selectors";
import "./form-address.css";

export const FormAddress = () => {
  const {
    currentPage,
    isBirthDateEmpty,
    isFormAddressCorrect,
    formAddressStatus,
    street,
    houseNumber,
    postCode,
    city,
  } = useAppSelector(selectFormAddressData);
  const dispatch = useAppDispatch();

  const goForward = () => {
    dispatch(setAddressFormIsDirty(true));
    if (!isFormAddressCorrect) return;
    if (currentPage === "home") dispatch(setFormStep("form-checkout"));
    if (currentPage === "remuneration") dispatch(setFormStep("form-remuneration"));
  };

  const disabled = () => currentPage === "remuneration" && isBirthDateEmpty;

  useEffect(() => {
    dispatch(setFormSubtitle("2. Kontaktdaten"));
  }, []);

  return (
    <div className="form-address">
      <div className="form-address__content">
        <div className="form-address__row">
          <InputText
            status={formAddressStatus.street}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihre korrekte Straße ein."
            label="Straße"
            name="street"
            placeholder="Straße"
            value={street}
            disabled={disabled()}
            onBlur={() => dispatch(setTouchedAddressFormKeys("street"))}
            onChange={(value) => dispatch(setFormAddressKey({ key: "street", value }))}
          />
          <InputText
            status={formAddressStatus.houseNumber}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihre korrekte Hausnummer ein."
            label="Hausnummer"
            name="houseNumber"
            placeholder="Hausnummer"
            value={houseNumber}
            disabled={disabled()}
            onBlur={() => dispatch(setTouchedAddressFormKeys("houseNumber"))}
            onChange={(value) => dispatch(setFormAddressKey({ key: "houseNumber", value }))}
          />
        </div>
        <div className="form-address__row">
          <InputText
            status={formAddressStatus.postCode}
            labelSize="s"
            iconSize="l"
            color="blue"
            popup="Bitte geben Sie Ihre korrekte PLZ ein."
            label="PLZ"
            name="postCode"
            placeholder="PLZ"
            value={postCode}
            disabled={disabled()}
            maxLength={5}
            onBlur={() => dispatch(setTouchedAddressFormKeys("postCode"))}
            onChange={(value) => dispatch(setFormAddressKey({ key: "postCode", value }))}
          />
          <InputText
            labelSize="s"
            iconSize="l"
            color="blue"
            status={formAddressStatus.city}
            popup="Bitte geben Sie Ihre korrekte Stadt ein."
            label="Stadt"
            name="city"
            placeholder="Stadt"
            value={city}
            disabled={disabled()}
            onBlur={() => dispatch(setTouchedAddressFormKeys("city"))}
            onChange={(value) => dispatch(setFormAddressKey({ key: "city", value }))}
          />
        </div>
      </div>
      <div className="form-address__action">
        <FormNavigationButton type="backward" onClick={() => dispatch(setFormStep("form-personal"))} />
        <FormNavigationButton type="forward" onClick={goForward} />
      </div>
    </div>
  );
};

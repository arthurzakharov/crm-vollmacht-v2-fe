import { useEffect } from "react";
import { CustomerInfo } from "@atoms/customer-info";
import { Logos } from "@atoms/logos";
import { CheckoutNewPart } from "@organisms/checkout-new-part";
import { CheckoutOldPart } from "@organisms/checkout-old-part";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { openDialog, setFormSubtitle } from "@redux/slice";
import { selectFormCheckoutData } from "@redux/selectors";
import "./form-checkout.css";

export const FormCheckout = () => {
  const { useOldVersion, useNewVersion } = useAppSelector(selectFormCheckoutData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFormSubtitle("3. Vollmacht"));
  }, []);

  return (
    <div className="form-checkout">
      <div className="form-checkout__navigation">
        <CustomerInfo version="form" />
      </div>
      {useOldVersion && <CheckoutOldPart />}
      {useNewVersion && <CheckoutNewPart />}
      <div className="form-checkout__info">
        Es gelten unsere{" "}
        <button onClick={() => dispatch(openDialog({ dialog: "mandate-condition" }))}>Mandatsbedingungen</button>. Hier
        finden Sie auch unsere{" "}
        <button onClick={() => dispatch(openDialog({ dialog: "right-for-refund" }))}>Widerrufsbelehrung</button>.
      </div>
      <div className="form-checkout__logos">
        <Logos />
      </div>
    </div>
  );
};

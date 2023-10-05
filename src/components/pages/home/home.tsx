import { useEffect } from "react";
import { Main } from "@atoms/main";
import { FormPersonal } from "@organisms/form-personal";
import { FormAddress } from "@organisms/form-address";
import { FormCheckout } from "@organisms/form-checkout";
import { Default } from "@templates/default";
import { useInitialActions } from "@hooks/useInitialActions";
import { useValidate } from "@hooks/useValidate";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setFormStep, setFormTitle, setNoBoxOnStrafsachen, setVariation } from "@redux/slice";
import { selectPageHomeData } from "@redux/selectors";
import { isCustomEvent, variationFromPathname } from "@utils/application";

export const Home = () => {
  useInitialActions("home");
  useValidate();
  const formStep = useAppSelector(selectPageHomeData);
  const dispatch = useAppDispatch();

  const handleOptimizelyCustomEvent = (event: Event): void => {
    if (isCustomEvent(event) && event.detail["no_box_on_strafsachen"]) {
      dispatch(setNoBoxOnStrafsachen(true));
    }
  };

  useEffect(() => {
    dispatch(setVariation(variationFromPathname()));
    dispatch(setFormStep("form-personal"));
    dispatch(setFormTitle("Vollmacht in Bußgeld - und Strafsachen"));
    document.addEventListener("optimizely", handleOptimizelyCustomEvent);
    return () => {
      document.removeEventListener("optimizely", handleOptimizelyCustomEvent);
    };
  }, []);

  return (
    <Default>
      <Main>
        {formStep === "form-personal" && <FormPersonal />}
        {formStep === "form-address" && <FormAddress />}
        {formStep === "form-checkout" && <FormCheckout />}
      </Main>
    </Default>
  );
};

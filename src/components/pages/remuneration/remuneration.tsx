import { useEffect } from "react";
import { Main } from "@atoms/main";
import { FormPersonal } from "@organisms/form-personal";
import { FormAddress } from "@organisms/form-address";
import { FormRemuneration } from "@organisms/form-remuneration";
import { Default } from "@templates/default";
import { useInitialActions } from "@hooks/useInitialActions";
import { useValidate } from "@hooks/useValidate";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setFormStep, setFormTitle, setPowerOfAttorneyAgreement } from "@redux/slice";
import { selectPageRemunerationData } from "@redux/selectors";

export const Remuneration = () => {
  useInitialActions("remuneration");
  useValidate();
  const { formStep, isBirthDateEmpty } = useAppSelector(selectPageRemunerationData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPowerOfAttorneyAgreement(true));
    dispatch(setFormTitle("Vollmacht in Bußgeld - und Strafsachen"));
  }, []);

  useEffect(() => {
    dispatch(setFormStep(isBirthDateEmpty ? "form-personal" : "form-remuneration"));
  }, [isBirthDateEmpty]);

  return (
    <Default>
      <Main>
        {formStep === "form-personal" && <FormPersonal />}
        {formStep === "form-address" && <FormAddress />}
        {formStep === "form-remuneration" && <FormRemuneration />}
      </Main>
    </Default>
  );
};

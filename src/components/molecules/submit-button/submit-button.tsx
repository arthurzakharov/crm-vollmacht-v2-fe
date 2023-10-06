import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { Loader } from "@atoms/loader";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectSubmitButtonData } from "@redux/selectors";
import { setAuthentication, setCheckoutSubmitCount, setIsLeadSigning } from "@redux/slice";
import { thunkPostSign, thunkPostSignRemuneration } from "@redux/thunks";
import { getAuthenticate } from "@api/requests";
import { fakeAwait, removeSecretFromUrlParams } from "@utils/application";
import "./submit-button.css";

export interface ISubmitButton {
  isSidebarVersion?: boolean;
}

export const SubmitButton = (props: ISubmitButton) => {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const { secret, baseUrl, currentPage, isLeadSigning, coverage, errors } = useAppSelector(selectSubmitButtonData);
  const dispatch = useAppDispatch();

  const signLead = async (): Promise<void> => {
    dispatch(setIsLeadSigning(true));
    if (currentPage === "home") await dispatch(thunkPostSign());
    if (currentPage === "remuneration") await dispatch(thunkPostSignRemuneration());
  };

  const checkIfLeadIsSigned = async (): Promise<boolean> => {
    const { data } = await getAuthenticate(baseUrl || "", secret || "");
    if (data.allowedPath === "/attachment") {
      dispatch(setAuthentication(data));
      dispatch(setIsLeadSigning(false));
      return true;
    } else {
      return false;
    }
  };

  const startWaitingLeadToBeSigned = async (): Promise<void> => {
    let counter = 0;
    do {
      if (await checkIfLeadIsSigned()) {
        const params = removeSecretFromUrlParams(search);
        navigate("/attachment/" + secret + params + hash);
        break;
      } else {
        await fakeAwait(3000);
        counter += 1;
      }
    } while (counter < 10);
    if (counter >= 10) {
      console.log("error");
      throw new Error();
    }
  };

  const onClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    dispatch(setCheckoutSubmitCount());
    if (errors.length > 0) {
      const target = e.target as HTMLButtonElement;
      target.blur();
      return;
    }
    try {
      await signLead();
      await startWaitingLeadToBeSigned();
    } catch (error) {
      console.error("CATCH ERROR");
    }
  };

  const getSubmitButtonText = (): string =>
    (coverage === "arag-protection" || coverage === "legal-pay") && window.useAlternateCta
      ? "Auftrag erteilen"
      : "Kostenpflichtig beauftragen";

  const submitButtonCn = (): string => {
    return cn("submit-button", isLeadSigning ? "submit-button--loading" : "submit-button--idle", {
      "submit-button--sidebar-version": !!props.isSidebarVersion,
    });
  };

  return (
    <button type="button" tabIndex={0} disabled={isLeadSigning} className={submitButtonCn()} onClick={onClick}>
      {isLeadSigning && (
        <div className="submit-button__loader">
          <Loader color="white" />
        </div>
      )}
      {getSubmitButtonText()}
    </button>
  );
};

import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { getSecret } from "@utils/application";
import { useAppDispatch } from "@redux/store";
import { setSecret } from "@redux/slice";

export const useGetSecretFromUrl = (page: Page) => {
  const location = useLocation();
  const { secret } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const apiSecret = getSecret(page, location.search, secret);
    if (apiSecret) {
      dispatch(setSecret(apiSecret));
    } else {
      throw new Error("Not able to get secret");
    }
  }, []);
};

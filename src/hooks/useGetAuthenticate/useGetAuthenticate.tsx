import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectUseGetAuthenticate } from "@redux/selectors";
import { thunkGetAuthenticate } from "@redux/thunks";

const shouldSkip = (
  baseUrl: string | null,
  secret: string | null,
  authentication: GetAuthenticateResponse | null,
): boolean => !baseUrl || !secret || !!authentication;

export const useGetAuthenticate = () => {
  const { baseUrl, secret, authentication } = useAppSelector(selectUseGetAuthenticate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shouldSkip(baseUrl, secret, authentication)) return;
    dispatch(thunkGetAuthenticate());
  }, [baseUrl, secret]);
};

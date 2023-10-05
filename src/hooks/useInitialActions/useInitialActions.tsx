import { useEffect } from "react";
import { useGetConfigJson } from "@hooks/useGetConfigJson";
import { useGetSecretFromUrl } from "@hooks/useGetSecretFromUrl";
import { useToFirstUrl } from "@hooks/useToFirstUrl";
import { useToAllowedPath } from "@hooks/useToAllowedPath";
import { useGetAuthenticate } from "@hooks/useGetAuthenticate";
import { usePostFirstView } from "@hooks/usePostFirstView";
import { useAppDispatch } from "@redux/store";
import { setCurrentPage } from "@redux/slice";

export const useInitialActions = (page: Page) => {
  useGetSecretFromUrl(page);
  useGetConfigJson();
  useGetAuthenticate();
  usePostFirstView();
  useToFirstUrl();
  useToAllowedPath();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(page));
  }, []);
};

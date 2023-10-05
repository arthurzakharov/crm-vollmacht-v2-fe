import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectUsePostFirstView } from "@redux/selectors";
import { thunkPostFirstView } from "@redux/thunks";

const getPathname = (): string => (window.location.pathname === "/" ? "" : window.location.pathname);

const getFirstViewUrl = (): string => window.location.origin + getPathname();

export const usePostFirstView = () => {
  const { firstViewUrl, currentPage } = useAppSelector(selectUsePostFirstView);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (firstViewUrl || currentPage !== "home") return;
    dispatch(thunkPostFirstView(getFirstViewUrl()));
  }, [firstViewUrl]);
};

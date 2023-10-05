import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@redux/store";
import { selectUseGetConfigJsonData } from "@redux/selectors";
import { thunkGetConfigJson } from "@redux/thunks";

export const useGetConfigJson = () => {
  const { baseUrl } = useAppSelector(selectUseGetConfigJsonData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!baseUrl) dispatch(thunkGetConfigJson());
  }, []);
};

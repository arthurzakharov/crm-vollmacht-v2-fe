import { useEffect } from "react";
import { ErrorScreen } from "@atoms/error-screen";
import { Plain } from "@templates/plain";
import { useAppDispatch } from "@redux/store";
import { setCurrentPage } from "@redux/slice";

export const Error = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage("error"));
  }, []);

  return (
    <Plain>
      <ErrorScreen />
    </Plain>
  );
};

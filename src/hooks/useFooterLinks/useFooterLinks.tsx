import { useAppDispatch } from "@redux/store";
import { openDialog } from "@redux/slice";

export const useFooterLinks = () => {
  const dispatch = useAppDispatch();

  return [
    {
      text: "Allgemeine Informationen",
      onClick: () => dispatch(openDialog({ dialog: "general-info" })),
    },
    {
      text: "Datenschutz",
      onClick: () => dispatch(openDialog({ dialog: "data-protection" })),
    },
    {
      text: "Impressum",
      onClick: () => dispatch(openDialog({ dialog: "imprint" })),
    },
  ];
};

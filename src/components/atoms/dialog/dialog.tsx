import { useEffect, useState, useRef } from "react";
import { useLockedBody, useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import { CompensationAgreement } from "@dialogs/compensation-agreement";
import { CompensationAgreementOnPenalties } from "@dialogs/compensation-agreement-on-penalties";
import { DataProtection } from "@dialogs/data-protection";
import { FileSize } from "@dialogs/file-size";
import { GeneralInfo } from "@dialogs/general-info";
import { Imprint } from "@dialogs/imprint";
import { MandateCondition } from "@dialogs/mandate-condition";
import { Powers } from "@dialogs/powers";
import { RightForRefund } from "@dialogs/right-for-refund";
import { UploadCategory } from "@dialogs/upload-category";
import { UploadCompleted } from "@dialogs/upload-completed";
import { UploadConfirmation } from "@dialogs/upload-confirmation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectDialogData } from "@redux/selectors";
import { resetDialogStyles, closeDialog } from "@redux/slice";
import "./dialog.css";

export const Dialog = () => {
  const [locked, setLocked] = useLockedBody(false, "root");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(true);
  const [localDialog, setLocalDialog] = useState<Dialog | null>(null);
  const { name, position, size } = useAppSelector(selectDialogData);
  const contentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const isDialogContentVisible = (dialogName: Dialog): boolean => {
    return name === dialogName || localDialog === dialogName;
  };

  const dialogCn = (): string => {
    return cn("dialog", name && !isClosing ? "dialog--visible" : "dialog--hidden", {
      "dialog--top": position === "top",
      "dialog--center": position === "center",
      "dialog--s": size === "s",
      "dialog--m": size === "m",
    });
  };

  const onOverlayClick = (): void => {
    dispatch(closeDialog());
  };

  useOnClickOutside(contentRef, onOverlayClick);

  useEffect(() => {
    if (name) setLocalDialog(name);
    if (name && !isMounted) {
      setIsMounted(true);
      setIsClosing(false);
      setLocked(!locked);
    }
    if (!name && isMounted) {
      setLocked(!locked);
      setTimeout(() => {
        setIsMounted(false);
        setLocalDialog(null);
        dispatch(resetDialogStyles());
      }, 300);
    }
  }, [name, isMounted]);

  return (name || localDialog) && isMounted ? (
    <div className={dialogCn()}>
      <div ref={contentRef} className="dialog__content">
        {isDialogContentVisible("compensation-agreement") && <CompensationAgreement />}
        {isDialogContentVisible("compensation-agreement-on-penalties") && <CompensationAgreementOnPenalties />}
        {isDialogContentVisible("data-protection") && <DataProtection />}
        {isDialogContentVisible("file-size") && <FileSize />}
        {isDialogContentVisible("general-info") && <GeneralInfo />}
        {isDialogContentVisible("imprint") && <Imprint />}
        {isDialogContentVisible("mandate-condition") && <MandateCondition />}
        {isDialogContentVisible("powers") && <Powers />}
        {isDialogContentVisible("right-for-refund") && <RightForRefund />}
        {isDialogContentVisible("upload-category") && <UploadCategory />}
        {isDialogContentVisible("upload-completed") && <UploadCompleted />}
        {isDialogContentVisible("upload-confirmation") && <UploadConfirmation />}
      </div>
    </div>
  ) : null;
};

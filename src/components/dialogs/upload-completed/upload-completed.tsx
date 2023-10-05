import { DialogArticle } from "@atoms/dialog-article";
import { clickDialogUploadCompletedConfirm, closeDialog } from "@redux/slice";
import { useAppDispatch } from "@redux/store";

export const UploadCompleted = () => {
  const dispatch = useAppDispatch();

  const onConfirmClick = (): void => {
    dispatch(clickDialogUploadCompletedConfirm());
    dispatch(closeDialog());
  };

  return (
    <DialogArticle hasNoCloseButton confirmButton="Okay" onConfirm={onConfirmClick}>
      <div>
        <h1>Vielen Dank, wir haben Ihre Dokumente erhalten!</h1>
        <p>
          Die Bearbeitungsdauer der übermittelten Dokumente richtet sich nach der Art des Schreibens und kann deshalb in
          einigen Fällen auch mehrere Tage in Anspruch nehmen.{" "}
          <strong>Bitte laden Sie das Dokument nicht erneut hoch</strong>. Sobald das übermittelte Dokument von uns
          bearbeitet wurde, werden wir Sie umgehend über die weitere Vorgehensweise informieren.
        </p>
        <p>Sollten Sie noch weitere Dokumente für uns haben, können Sie die natürlich auch noch an uns übermitteln</p>
      </div>
    </DialogArticle>
  );
};

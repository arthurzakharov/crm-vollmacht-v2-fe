import { DialogArticle } from "@atoms/dialog-article";
import { useAppDispatch } from "@redux/store";
import { closeDialog, openDialog } from "@redux/slice";
import { thunkPostFiles } from "@redux/thunks";

export const UploadConfirmation = () => {
  const dispatch = useAppDispatch();

  const onUploadFiles = async (): Promise<void> => {
    dispatch(closeDialog());
    await dispatch(thunkPostFiles());
    dispatch(openDialog({ dialog: "upload-completed", position: "top", size: "s" }));
  };

  return (
    <DialogArticle
      hasNoCloseButton
      cancelButton="Nein"
      confirmButton="Ja, alles vollständig"
      onCancel={() => dispatch(closeDialog())}
      onConfirm={() => onUploadFiles()}
    >
      <div>
        <h1>Behördenschreiben vollständig?</h1>
        <p>Haben Sie alle Dateien bzw. Seiten (einschließlich der Rückseiten) des Behördenschreibens ausgewählt?</p>
      </div>
    </DialogArticle>
  );
};

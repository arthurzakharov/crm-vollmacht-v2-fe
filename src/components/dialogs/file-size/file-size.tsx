import { DialogArticle } from "@atoms/dialog-article";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { selectDialogFileSizeData } from "@redux/selectors";
import { closeDialog } from "@redux/slice";
import "./file-size.css";

export const FileSize = () => {
  const { files } = useAppSelector(selectDialogFileSizeData);
  const dispatch = useAppDispatch();

  return (
    <DialogArticle
      hasNoCloseButton
      confirmButton="Verstanden, Fenster schließen"
      onConfirm={() => dispatch(closeDialog())}
    >
      <div>
        <h1>Datei zu groß</h1>
        <ul className="file-size__list">
          {files.map((file) => (
            <li key={file.name}>
              <div>
                <i>{file.name}</i> - {file.size}
              </div>
            </li>
          ))}
        </ul>
        <p>überschreitet die maximale Dateigröße von 6 MB.</p>
        <p>Wählen Sie bitte eine kleinere Datei aus.</p>
      </div>
    </DialogArticle>
  );
};

import type { MouseEvent } from "react";
import type { FileRejection } from "react-dropzone";
import Dropzone from "react-dropzone";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import { Loader } from "@atoms/loader";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { openDialog, setFilesToUpload } from "@redux/slice";
import { selectUploaderData } from "@redux/selectors";
import { fileSize } from "@utils/application";
import uploadSrc from "/png/upload.png";
import trashGraySrc from "/png/trash-gray.png";
import trashBlueSrc from "/png/trash-blue.png";
import fileSrc from "/png/file.png";
import checkSrc from "/png/check.png";
import "./uploader.css";
import { useEffect } from "react";

export const Uploader = () => {
  const { list, filesToUpload, status } = useAppSelector(selectUploaderData);
  const dispatch = useAppDispatch();

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]): void => {
    if (rejectedFiles.length) {
      dispatch(
        openDialog({
          dialog: "file-size",
          position: "top",
          size: "s",
          payload: rejectedFiles,
        }),
      );
    }
    if (acceptedFiles.length) {
      const newFilesToUpload = acceptedFiles.map((acceptedFile: File, i: number): File => {
        const type = acceptedFile.type;
        const count = filesToUpload.length + i + 1;
        const hasSuchName = filesToUpload.find((file: File) => file.name === `${count}-${acceptedFile.name}`);
        const fileName = `${hasSuchName ? count + 1 : count}-${acceptedFile.name}`;
        return new File([acceptedFile], fileName, { type });
      });
      dispatch(setFilesToUpload([...filesToUpload, ...newFilesToUpload]));
    }
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>, fileName: string): void => {
    e.stopPropagation();
    const updatedFilesToUpload = filesToUpload.filter((file: File) => file.name !== fileName);
    dispatch(setFilesToUpload(updatedFilesToUpload));
  };

  const onUpload = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    dispatch(openDialog({ dialog: "upload-confirmation", position: "top", size: "s" }));
  };

  const isDragAndDropVisible = (): boolean => !list.length;

  useEffect(() => {
    console.log("list", list);
    console.log("filesToUpload", filesToUpload);
    console.log("status", status);
  });

  console.log("isDragAndDropVisible", isDragAndDropVisible());

  return (
    <div className="uploader">
      {!list.length ? (
        <p className="uploader__title">
          Perfekt! Übermitteln Sie jetzt bitte <u>das letzte Schreiben</u> das Sie bereits erhalten haben.
        </p>
      ) : null}
      <AnimateHeight height={isDragAndDropVisible() ? "auto" : 0}>
        <Dropzone
          noKeyboard
          multiple
          maxSize={6000000}
          accept={{
            "image/gif": [".gif"],
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "application/pdf": [".pdf"],
          }}
          onDrop={(acceptedFiles, rejectedFiles) => onDrop(acceptedFiles, rejectedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="uploader__content">
              <input {...getInputProps()} />
              <div className={cn("uploader__wrapper", { "uploader__wrapper--pending": status === "pending" })}>
                <div className="uploader__drop-title">
                  <strong>Zuletzt erhaltenes Behördenschreiben</strong>
                  <br />
                  (alle Vorder- und Rückseiten sofern bedruckt)
                </div>
                <ul className="uploader__file-list">
                  {filesToUpload.map((file: File, i: number) => (
                    <li key={`${file.name}-${i}`} className="uploader__file">
                      <img className="uploader__file-icon" alt="file" src={fileSrc} />
                      <span className="uploader__file-text">
                        {file.name} - {fileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        tabIndex={0}
                        className="uploader__delete"
                        onClick={(e) => onDelete(e, file.name)}
                      >
                        <img alt="trash" src={trashGraySrc} />
                        <img alt="trash" src={trashBlueSrc} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="uploader__drop-area">
                  <img alt="upload" src={uploadSrc} />
                  <p>
                    Datei(en) auswählen /<br />
                    Dokumentenseite abfotografieren
                  </p>
                  <p>Maximale Dateigröße pro Datei: 6 MB. Unterstützte Dateitypen: PDF, JPG, GIF, PNG.</p>
                </div>
                {!!filesToUpload.length && (
                  <>
                    <button type="button" tabIndex={0} className="uploader__button" onClick={onUpload}>
                      Behördenschreiben übermitteln
                    </button>
                  </>
                )}
              </div>
              {status === "pending" && (
                <div className="uploader__loader">
                  <Loader color="orange" />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </AnimateHeight>
      {!!list.length && (
        <div className="uploader__uploaded-files">
          <h6>Bereits übermittelt</h6>
          <ul>
            {list.map((uploadedFile: string) => (
              <li key={uploadedFile}>
                <span>{uploadedFile}</span>
                <img alt="check" src={checkSrc} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { FileRejection } from "react-dropzone";
import Dropzone from "react-dropzone";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import { Dropdown } from "@atoms/dropdown";
import { Loader } from "@atoms/loader";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { openDialog, setFilesCategory, setFilesToUpload, setFilesUploadingMore } from "@redux/slice";
import { selectUploaderData } from "@redux/selectors";
import { fileSize } from "@utils/application";
import uploadSrc from "/png/upload.png";
import trashGraySrc from "/png/trash-gray.png";
import trashBlueSrc from "/png/trash-blue.png";
import fileSrc from "/png/file.png";
import plusSrc from "/png/plus.png";
import checkSrc from "/png/check.png";
import "./uploader.css";

const TOPICS = [
  {
    value: "penaltyNoteLetter",
    label: "Bußgeldbescheid",
  },
  {
    value: "lawHearingLetter",
    label: "Anhörungsbogen",
  },
  {
    value: "witnessQuestionnaire",
    label: "Zeugenfragebogen",
  },
  {
    value: "unknown",
    label: "Sonstiges / Unsicher",
  },
];

export const Uploader = () => {
  const [uploadedFiles, setUploadedList] = useState<string[]>([]);
  const { list, filesToUpload, category, uploadingMore, status } = useAppSelector(selectUploaderData);
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

  const onDocumentCategory = (category: string): void => {
    dispatch(setFilesCategory(category));
  };

  const onInfo = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    const button = e.currentTarget as HTMLButtonElement;
    button.blur();
    dispatch(openDialog({ dialog: "upload-category", position: "top", size: "m" }));
  };

  const onMoreButton = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(setFilesUploadingMore(true));
  };

  const isDragAndDropVisible = (): boolean => !list.length || uploadingMore;

  useEffect(() => {
    const formattedList = list
      .map((d: string) => {
        switch (d) {
          case "penaltyNoteLetter":
            return "Bußgeldbescheid";
          case "lawHearingLetter":
            return "Anhörungsbogen";
          case "witnessQuestionnaire":
            return "Zeugenfragebogen";
          default:
            return "Behördenschreiben";
        }
      })
      .map((d, index, arr) => {
        const arrayOfIndexes = arr.reduce((result: number[], item: string, index: number) => {
          if (item === d) result.push(index);
          return result;
        }, []);
        const dPosition = arrayOfIndexes.indexOf(index);
        return dPosition > 0 ? `${d} #${dPosition + 1}` : d;
      });
    setUploadedList(formattedList);
  }, [list]);

  return (
    <div className="uploader">
      {!list.length ? (
        <p className="uploader__title">
          Perfekt! Übermitteln Sie jetzt bitte <u>das letzte Schreiben</u> das Sie bereits erhalten haben.
        </p>
      ) : (
        <button type="button" tabIndex={0} className="uploader__more-button" onClick={onMoreButton}>
          <img alt="plus" src={plusSrc} />
          <span>Weiteres Behördenschreiben übermitteln</span>
        </button>
      )}
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
                    <div className="uploader__category">
                      <h6 className="uploader__category-title">
                        <span>Um welches Behördenschreiben handelt es sich?</span>
                        <button type="button" tabIndex={0} className="uploader__category-info" onClick={onInfo}>
                          i
                        </button>
                      </h6>
                      <Dropdown
                        status="neutral"
                        isSearchHidden
                        stopPropagation
                        placeholder="Dokumententyp auswählen ..."
                        options={TOPICS}
                        value={category || ""}
                        onChange={onDocumentCategory}
                      />
                    </div>
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
      {!!uploadedFiles.length && (
        <div
          className={cn("uploader__uploaded-files", {
            "uploader__uploaded-files--with-margin": isDragAndDropVisible(),
          })}
        >
          <h6>Bereits übermittelt</h6>
          <ul>
            {uploadedFiles.map((uploadedFile: string) => (
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

import { useEffect, useState } from "react";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import { Uploader } from "@organisms/uploader";
import { InputRadio } from "@molecules/input-radio";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setActiveAttachmentSection, setFilesUploadingMore } from "@redux/slice";
import { selectFilesData } from "@redux/selectors";
import "./files.css";

type GotLetter = "yes" | "no" | "";

export const Files = () => {
  const [gotLetter, setGotLetter] = useState<GotLetter>("");
  const { activeSection, completed } = useAppSelector(selectFilesData);
  const dispatch = useAppDispatch();

  const updateQuestionAnswer = (value: string): void => {
    setGotLetter(value as GotLetter);
    if (value === "no") {
      // TODO: What if there is no survey next. It was already answered
      dispatch(setActiveAttachmentSection("survey"));
    }
  };

  const getDescription = (): string =>
    completed
      ? "Sobald Sie neue Behördenschreiben erhalten, übermitteln Sie uns diese bitte umgehend."
      : "Wir können mit der Fallbearbeitung des registrierten Verstoßes erst beginnen, wenn uns <strong>das letzte Schreiben, das Sie von der Behörde erhalten</strong> haben, vorliegt.";

  useEffect(() => {
    if (activeSection !== "files") {
      setTimeout(() => {
        setGotLetter(completed ? "yes" : "");
        dispatch(setFilesUploadingMore(false));
      }, 450);
    }
  }, [activeSection]);

  return (
    <div className="files">
      <p className="files__description" dangerouslySetInnerHTML={{ __html: getDescription() }} />
      {!completed && (
        <div className={cn("files__questions", { "files__questions--single": gotLetter !== "yes" })}>
          <p className="files__subtitle">Haben Sie bereits Post von der Behörde erhalten?</p>
          <InputRadio
            options={[
              { label: "Ja", value: "yes" },
              { label: "Nein", value: "no" },
            ]}
            value={gotLetter}
            name="gotLetter"
            status="neutral"
            sizeRadio="m"
            sizeLabel="m"
            onChange={updateQuestionAnswer}
          />
        </div>
      )}
      <AnimateHeight
        duration={300}
        delay={150}
        animateOpacity
        easing="cubic-bezier(0.4, 0, 0.2, 1)"
        height={gotLetter === "yes" ? "auto" : 0}
      >
        <div className={cn("files__upload", { "files__upload--single": completed })}>
          <Uploader />
        </div>
      </AnimateHeight>
    </div>
  );
};

import { DialogArticle } from "@atoms/dialog-article";
import { useAppDispatch } from "@redux/store";
import { closeDialog } from "@redux/slice";
import "./upload-category.css";

export const UploadCategory = () => {
  const dispatch = useAppDispatch();

  return (
    <DialogArticle hasNoCloseButton>
      <div id="upload-category">
        <h3 className="upload-category-title">
          Worin unterscheiden sich Bußgeldbescheid, Anhörungsbogen und Zeugenfragebogen?
        </h3>
        <h4 className="upload-category-subtitle">Bußgeldbescheid</h4>
        <p className="upload-category-text">
          Sie erkennen ihn an der Bezeichnung <strong>“Bußgeldbescheid”</strong> prominent in der obern hälfte des
          Schreibens.
        </p>
        <h4 className="upload-category-subtitle">Anhörungsbogen</h4>
        <p className="upload-category-text">
          Sie erkennen ihn an der Bezeichnung <strong>“Anhörungsbogen”</strong> oder{" "}
          <strong>“Anhörung zum Verstoß...”</strong>
          prominent in der obern hälfte des Schreibens.
        </p>
        <h4 className="upload-category-subtitle">Zeugenfragebogen</h4>
        <p className="upload-category-text">
          Sie erkennen ihn an der Bezeichnung <strong>“Zeugenfragebogen”</strong> oder{" "}
          <strong>“Feststellung des Fahrzeughalters”</strong> prominent in der obern hälfte des Schreibens.
        </p>
        <button className="upload-category-button" onClick={() => dispatch(closeDialog())}>
          Verstanden, Fenster schließen
        </button>
      </div>
    </DialogArticle>
  );
};

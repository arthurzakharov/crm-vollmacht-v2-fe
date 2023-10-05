import submittedSrc from "/png/submitted.png";
import "./attachment-success.css";

export const AttachmentSuccess = () => (
  <div className="attachment-success">
    <img alt="submitted" src={submittedSrc} className="attachment-success__image" />
    <h6 className="attachment-success__title">Vielen Dank!</h6>
    <p className="attachment-success__text">
      Wir haben Ihre Informationen erhalten und werden diese umgehend bearbeiten.
    </p>
    <p className="attachment-success__text">
      Sobald neue Erkentnisse vorliegen, setzen wir uns mit Ihnen in Verbindung.
    </p>
  </div>
);

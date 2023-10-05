import checkCircleSrc from "/png/check-circle.png";
import "./warning-notice.css";

export const WarningNotice = () => (
  <div className="warning-notice">
    <img alt="check-circle" src={checkCircleSrc} className="warning-notice__image" />
    <p className="warning-notice__text">
      <strong className="warning-notice__title">Sind Sie rechtsschutzversichert?</strong> Keine Sorge! Für den
      unwahrscheinlichen Fall, dass Ihre Rechtsschutzversicherung eine Deckungsabsage erteilt, werden wir nicht tätig
      und Ihnen entstehen selbstverständlich keine Kosten.
    </p>
  </div>
);

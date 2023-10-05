import iconTuvSrc from "/jpeg/icon-tuv.jpeg";
import iconTlsSrc from "/png/icon-tls.png";
import "./logos.css";

export const Logos = () => (
  <div className="logos">
    <div className="logos__tls">
      <img alt="tls-icon" src={iconTlsSrc} className="logos__icon" />
      <span className="logos__text">Höchste</span>
      <span className="logos__text">Datensicherheit.</span>
    </div>
    <img alt="tuv-icon" src={iconTuvSrc} className="logos__tuv" />
  </div>
);

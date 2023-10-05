import logoSrc from "/png/logo.png";
import phoneSrc from "/png/phone.png";
import "./header.css";

export interface IHeader {
  tel: string;
}

export const Header = (props: IHeader) => {
  const getTelForLink = (tel: string): string => {
    return "tel:+49" + tel.replace(/^0|[^0-9.]/g, "");
  };

  return (
    <header className="header">
      <img alt="logo-icon" src={logoSrc} className="header__logo" />
      <a href={getTelForLink(props.tel)} className="header__link">
        <img alt="phone-icon" src={phoneSrc} className="header__phone" />
        <span className="header__number">{props.tel}</span>
      </a>
    </header>
  );
};

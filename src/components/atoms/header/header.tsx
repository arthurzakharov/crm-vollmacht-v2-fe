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

  const onClick = (): void => {
    window.open(getTelForLink(props.tel), "_self");
  };

  return (
    <header className="header">
      <img alt="logo-icon" src={logoSrc} className="header__logo" />
      <button tabIndex={0} className="header__link" onClick={onClick}>
        <img alt="phone-icon" src={phoneSrc} className="header__phone" />
        <span className="header__number">{props.tel}</span>
      </button>
    </header>
  );
};

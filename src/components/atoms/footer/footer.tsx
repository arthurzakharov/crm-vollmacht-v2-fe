import "./footer.css";

export type FooterLink = {
  text: string;
  onClick: () => void;
};

export interface IFooter {
  links: FooterLink[];
}

export const Footer = (props: IFooter) => (
  <footer className="footer">
    <hr className="footer__line" />
    <div className="footer__content">
      <span>© {new Date().getFullYear()} sos-verkehrsrecht.de</span>
      <ul className="footer__links">
        {props.links.map((link: FooterLink) => (
          <li key={link.text} className="footer__link">
            <button type="button" tabIndex={0} onClick={link.onClick}>
              {link.text}
            </button>
            <div className="footer__separator" />
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

import { PropsWithChildren } from "react";
import { Header } from "crm-vollmacht-ui";
import { Footer } from "@atoms/footer";
import { useFooterLinks } from "@hooks/useFooterLinks";
import logoSrc from "/png/logo.png";
import "./plain.css";

export const Plain = (props: PropsWithChildren) => {
  const links = useFooterLinks();

  return (
    <div className="plain">
      <div className="plain__header">
        <Header logo={logoSrc} tel="030 / 20 898 12 11" />
      </div>
      {props.children}
      <div className="plain__footer">
        <Footer links={links} />
      </div>
    </div>
  );
};

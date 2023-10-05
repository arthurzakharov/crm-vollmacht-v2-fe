import { PropsWithChildren } from "react";
import { Header } from "@atoms/header";
import { Footer } from "@atoms/footer";
import { useFooterLinks } from "@hooks/useFooterLinks";
import "./plain.css";

export const Plain = (props: PropsWithChildren) => {
  const links = useFooterLinks();

  return (
    <div className="plain">
      <div className="plain__header">
        <Header tel="030 / 20 898 12 11" />
      </div>
      {props.children}
      <div className="plain__footer">
        <Footer links={links} />
      </div>
    </div>
  );
};

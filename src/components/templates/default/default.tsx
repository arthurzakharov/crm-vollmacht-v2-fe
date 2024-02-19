import { PropsWithChildren, ReactNode } from "react";
import { Header } from "crm-vollmacht-ui";
import { ErrorScreen } from "@atoms/error-screen";
import { Footer } from "@atoms/footer";
import { Loader } from "@atoms/loader";
import { Sidebar } from "@organisms/sidebar";
import { useAppSelector } from "@redux/store";
import { selectTemplateDefaultData } from "@redux/selectors";
import { useFooterLinks } from "@hooks/useFooterLinks";
import logoSrc from "/png/logo.png";
import "./default.css";

export const Default = (props: PropsWithChildren) => {
  const { fulfilled, rejected } = useAppSelector(selectTemplateDefaultData);
  const links = useFooterLinks();

  const getContent = (children: ReactNode): ReactNode => {
    if (rejected) return <ErrorScreen />;
    if (fulfilled) {
      return (
        <div className="default__content">
          <div className="default__main">{children}</div>
          <div className="default__sidebar">
            <Sidebar />
          </div>
        </div>
      );
    }
    return (
      <div className="default__loading">
        <Loader color="orange" />
      </div>
    );
  };

  return (
    <div className="default">
      <div className="default__header">
        <Header logo={logoSrc} tel="ass" />
      </div>
      {getContent(props.children)}
      <div className="default__footer">
        <Footer links={links} />
      </div>
    </div>
  );
};

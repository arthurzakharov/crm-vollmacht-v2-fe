import type { PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import { getMainData } from "@redux/selectors";
import { useAppSelector } from "@redux/store";
import "./main.css";

export const Main = (props: PropsWithChildren) => {
  const isPortableDevice = useMediaQuery("(max-width: 1023px)");
  const { currentPage, formTitle, formSubtitle, charge, reference } = useAppSelector(getMainData);

  const isAttachment = (page: Page | null): boolean => {
    return page === "attachment";
  };

  const main = (): string => {
    return cn("main", isAttachment(currentPage) ? "main--attachment" : "main--home");
  };

  return (
    <div className={main()}>
      <h1 className="main__title">{formTitle}</h1>
      {!isAttachment(currentPage) && isPortableDevice && (
        <div className="main__info">
          <p className="main__client">
            <strong>Tatvorwurf: </strong>
            {charge}
          </p>
          <p className="main__client">
            <strong>Mandat Nr: </strong>
            {reference}
          </p>
        </div>
      )}
      {isAttachment(currentPage) ? (
        <div className="main__content">
          <h2 className="main__subtitle">Danke für Ihr Vertrauen</h2>
          <p className="main__text">Für eine schnelle Bearbeitung benötigen wir noch folgende Informationen.</p>
          <hr className="main__line" />
          {props.children}
        </div>
      ) : (
        <div className="main__content">
          <h2 className="main__subtitle">{formSubtitle}</h2>
          {props.children}
        </div>
      )}
    </div>
  );
};

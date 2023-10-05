import type { Height } from "react-animate-height";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { CustomerInfo } from "@atoms/customer-info";
import { useAppSelector } from "@redux/store";
import { selectSidebarInfoData } from "@redux/selectors";
import "./sidebar-info.css";

export const SidebarInfo = () => {
  const { formStep, currentPage, charge, reference } = useAppSelector(selectSidebarInfoData);
  const [height, setHeight] = useState<Height>(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    setHeight(isOpened ? "auto" : 0);
  }, [isOpened]);

  useEffect(() => {
    setIsOpened(formStep === "form-checkout" || formStep === "form-remuneration");
  }, [formStep]);

  return (
    <div className="sidebar-info">
      <div>
        <p className="sidebar-info__text">
          <strong>Tatvorwurf: </strong>
          {charge}
        </p>
        <p className="sidebar-info__text">
          <strong>Mandat Nr: </strong>
          {reference}
        </p>
      </div>
      {currentPage !== "attachment" && (
        <AnimateHeight duration={250} delay={125} animateOpacity easing="cubic-bezier(0.4, 0, 0.2, 1)" height={height}>
          <div className="sidebar-info__wrap">
            <CustomerInfo version="sidebar" />
          </div>
        </AnimateHeight>
      )}
    </div>
  );
};

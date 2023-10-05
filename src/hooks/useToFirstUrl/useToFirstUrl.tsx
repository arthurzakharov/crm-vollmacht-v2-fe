import { useEffect } from "react";
import { useLocation } from "react-router";
import { addSecretAsFirstUrlParam, getOrigin, removeSecretFromUrlParams } from "@utils/application";
import { useAppSelector } from "@redux/store";
import { selectUseToFirstUrlData } from "@redux/selectors";

export const useToFirstUrl = () => {
  const { search, hash } = useLocation();
  const { secret, firstViewUrl, allowedPath, status } = useAppSelector(selectUseToFirstUrlData);

  const shouldGoToFirstViewUrl = (): boolean =>
    !!(
      secret &&
      status === "fulfilled" &&
      allowedPath &&
      firstViewUrl !== null &&
      getOrigin(firstViewUrl) !== window.origin
    );

  const handleHomeCase = (): void => {
    const params = addSecretAsFirstUrlParam(search, secret);
    window.location.replace(`${firstViewUrl}${params}${hash}`);
  };

  const handleAttachmentCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    window.location.replace(`${firstViewUrl}/attachment/${secret}${params}${hash}`);
  };

  const handleRemunerationCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    window.location.replace(`${firstViewUrl}/remuneration/${secret}${params}${hash}`);
  };

  const goToFirstViewUrl = (): void => {
    if (status === "fulfilled" && allowedPath === "/") handleHomeCase();
    if (status === "fulfilled" && allowedPath === "/attachment") handleAttachmentCase();
    if (status === "fulfilled" && allowedPath === "/remuneration") handleRemunerationCase();
  };

  useEffect(() => {
    if (shouldGoToFirstViewUrl()) {
      goToFirstViewUrl();
    }
  }, [status]);
};

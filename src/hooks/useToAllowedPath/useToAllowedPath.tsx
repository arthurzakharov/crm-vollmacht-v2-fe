import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  addSecretAsFirstUrlParam,
  allowedPathFromUrl,
  getPathname,
  urlFromWindow,
  removeSecretFromUrlParams,
} from "@utils/application";
import { useAppSelector } from "@redux/store";
import { selectUseToAllowedPath } from "@redux/selectors";

export const useToAllowedPath = () => {
  const { search, hash } = useLocation();
  const navigate = useNavigate();
  const { secret, firstViewUrl, allowedPath, status } = useAppSelector(selectUseToAllowedPath);

  const shouldGoToAllowedPath = (): boolean => {
    const currentPath = allowedPathFromUrl(window.location.pathname);
    const currentUrl = urlFromWindow();
    return (
      (secret && status === "fulfilled" && allowedPath !== currentPath) ||
      (currentUrl !== firstViewUrl && firstViewUrl !== null)
    );
  };

  const handleHomeCase = (): void => {
    const params = addSecretAsFirstUrlParam(search, secret);
    navigate(`${getPathname(firstViewUrl)}${params}${hash}`);
  };

  const handleAttachmentCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    if (status === "fulfilled") navigate(`${allowedPath}/${secret}${params}${hash}`);
  };

  const handleRemunerationCase = (): void => {
    const params = removeSecretFromUrlParams(search);
    if (status === "fulfilled") navigate(`${allowedPath}/${secret}${params}${hash}`);
  };

  const goToAllowedPath = () => {
    if (status === "fulfilled" && allowedPath === "/attachment") handleAttachmentCase();
    if (status === "fulfilled" && allowedPath === "/remuneration") handleRemunerationCase();
    if (status === "fulfilled" && allowedPath === "/") handleHomeCase();
  };

  useEffect(() => {
    if (shouldGoToAllowedPath()) {
      goToAllowedPath();
    }
  }, [status]);
};

import type { ChangeEvent, MouseEvent } from "react";

export const addSecretAsFirstUrlParam = (search: string, secret: string): string => {
  if (!search && !secret) return "";
  const params = new URLSearchParams(search);
  params.has("secret") && secret !== "" ? params.set("secret", secret) : params.append("secret", secret);
  const rest = [""];
  params.forEach((v, k) => k !== "secret" && rest.push(`${k}=${v}`));
  return `?secret=${params.get("secret")}${rest.join("&")}`;
};

export const removeSecretFromUrlParams = (search: string): string => {
  const params = new URLSearchParams(search);
  params.delete("secret");
  return params.size ? `?${params.toString()}` : "";
};

export const allowedPathFromUrl = (path: string): AllowedPath => {
  if (path.includes("attachment")) return "/attachment";
  if (path.includes("remuneration")) return "/remuneration";
  return "/";
};

export const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const convertToDateNumber = (num: string): string => {
  if (parseInt(num).toString().length !== num.length) return "";
  return num.length === 1 ? `0${num}` : num;
};

export const isValidUrl = (url: any): boolean => {
  try {
    return !!new URL(url);
  } catch (e) {
    return false;
  }
};

export const getPathname = (url: any): string => (isValidUrl(url) ? new URL(url).pathname : "");

export const getOrigin = (url: any): string => (isValidUrl(url) ? new URL(url).origin : "");

export const isSecret = (secret: string): boolean => secret.length === 100;

export const secretFromUrlParam = (search: string): string => new URLSearchParams(search).get("secret") || "";

export const urlFromWindow = (): string => {
  const pathname = window.location.pathname === "/" ? "" : window.location.pathname;
  return window.origin + pathname;
};

export const sourceFromSearch = (): string => {
  const params = new URLSearchParams(window.location.search.toLowerCase());
  return params.has("source") && params.has("sms") ? "sms" : "";
};

export const oneOf = (types: Poa[], type?: Poa): boolean => {
  return !!type && types.indexOf(type) >= 0;
};

export const fileSize = (size: number): string => {
  const pow = Math.pow(10, 2);
  return !!Math.round(size / 1000000)
    ? `${Math.abs(Math.round((size / 1000000) * pow) / pow)}MB`
    : `${Math.abs(Math.round((size / 1000) * pow) / pow)}KB`;
};

export const variationFromPathname = (): Variation => {
  switch (window.location.pathname) {
    case "/":
    case "/a":
      return "c";
    case "/b":
      return "b";
    case "/c":
      return "c";
    default:
      return "c";
  }
};

export const isDateInExpectedFormat = (date: string): boolean => {
  const dateArray = date.split("/");
  return dateArray.length === 3 && dateArray.every((d) => Number.isInteger(Number(d)));
};

export const parserCustomDate = (date: string): string => {
  if (isDateInExpectedFormat(date)) return date;
  const rawDate = date.split("T")[0].split("-");
  if (rawDate.length === 3 && rawDate.every((r) => Number.isInteger(Number(r)))) {
    const correctOrder = [rawDate[0], rawDate[1], rawDate[2]];
    return correctOrder.join("-");
  } else {
    return "";
  }
};

export const convertDate = (date: string): string => {
  const rawDate = date.split("/");
  if (rawDate.length === 3 && rawDate.every((r) => Number.isInteger(Number(r)))) {
    const correctOrder = [rawDate[2], rawDate[1], rawDate[0]];
    return correctOrder.join("-");
  } else {
    return parserCustomDate(date);
  }
};

export const fromWhereGetSecret = (page: Page): WhereSecret => {
  switch (page) {
    case "home":
      return "query";
    case "attachment":
    case "remuneration":
      return "path";
    default:
      return "query";
  }
};

export const getSecret = (page: Page, search: string, secret: string = ""): string => {
  switch (fromWhereGetSecret(page)) {
    case "query":
      const querySecret = secretFromUrlParam(search);
      return isSecret(querySecret) ? querySecret : "";
    case "path":
      return isSecret(secret) ? secret : "";
  }
};

export const isValidDate = (date: string): boolean => {
  const [day, month, year] = date.split("/");
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y) || date.length !== 10) return false;
  if (m > 12 || d > 31) {
    return false;
  } else if (m === 2 && d > 28) {
    if (d === 29) {
      if (!isLeapYear(y)) {
        return false;
      }
    } else {
      return false;
    }
  } else if (d > 30 && (m === 4 || m === 6 || m === 9 || m === 11)) {
    return false;
  }
  return true;
};

export const isValidBirthDate = (date: string): boolean => {
  const regExp = /^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/g;
  if (regExp.test(date) && isValidDate(date)) {
    const [day, month, year] = date.split("/");
    const today = new Date();
    const entryAgeYear = String(today.getFullYear() - 18);
    const entryAgeMonth = convertToDateNumber(String(today.getMonth() + 1));
    const entryAgeDay = convertToDateNumber(`${today.getDate()}`);
    const birth = new Date(`${year}-${month}-${day}T00:00:00`);
    const entry = new Date(`${entryAgeYear}-${entryAgeMonth}-${entryAgeDay}T00:00:00`);
    return birth <= entry;
  }
  return false;
};

export const fakeAwait = async (time = 500): Promise<void> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

// Type-guards
export const isCustomEvent = (event: unknown): event is CustomEvent => event instanceof Event && "detail" in event;

export const isMouseEvent = (event: unknown): event is MouseEvent<HTMLElement> =>
  event instanceof Event && event.type === "click";

export const isChangeEvent = (event: unknown): event is ChangeEvent<HTMLElement> =>
  event instanceof Event && event.type === "change";

export const handleButtonFocusState = (e: unknown): void => {
  if (isMouseEvent(e)) {
    e.clientY !== 0 && e.clientX !== 0 ? e.currentTarget.blur() : e.currentTarget.focus();
  }
  if (isChangeEvent(e)) {
    // @ts-ignore
    e.nativeEvent.pageX !== 0 && e.nativeEvent.pageY !== 0 ? e.currentTarget.blur() : e.currentTarget.focus();
  }
};

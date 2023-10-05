import { HTTPS, HTTPS_INIT, HTTPS_MULTIPART, MOCK } from "@api/instances";

export const getConfigJson = async (): Promise<GetConfigJsonResponse> => {
  if (import.meta.env.DEV) {
    const { data } = await MOCK.get<GetConfigJsonResponse>("/config.json");
    return data;
  } else {
    const { data } = await HTTPS_INIT.get<GetConfigJsonResponse>("/config.json");
    return data;
  }
};

export const getAuthenticate = async (apiUrl: string, secret: string) => {
  return await HTTPS.get<GetAuthenticateResponse>(apiUrl + "/authenticate/" + secret);
};

export const getSignature = async (apiUrl: string, fullName: string) => {
  return await HTTPS.get<GetSignatureResponse>(apiUrl + "/getsignature/" + fullName);
};

export const postFirstView = async (apiUrl: string, secret: string, url: string) => {
  return await HTTPS.post<"", PostFirstViewResponse, PostFirstViewPayload>(`${apiUrl}/first-view`, {
    secret,
    url,
  });
};

export const postSign = async (apiUrl: string, data: PostSignPayload) => {
  return await HTTPS.post(`${apiUrl}/sign`, data);
};

export const postSignRemuneration = async (apiUrl: string, data: PostSignPayload) => {
  return await HTTPS.post(`${apiUrl}/sign/remuneration`, data);
};

export const postInsuranceInformation = async (apiUrl: string, data: PostInsuranceInformationPayload) => {
  return await HTTPS.post(`${apiUrl}/insurance-information`, data);
};

export const postClientSurvey = async (apiUrl: string, data: PostClientSurveyPayload) => {
  return await HTTPS.post(`${apiUrl}/client-survey`, data);
};

export const postFiles = async (apiUrl: string, data: PostFilesPayload) => {
  return await HTTPS_MULTIPART.post<PostFilesResponse>(`${apiUrl}/files`, data);
};

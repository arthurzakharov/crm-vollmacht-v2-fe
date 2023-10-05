import type { ThunkState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuthenticate,
  getConfigJson,
  getSignature,
  postClientSurvey,
  postFiles,
  postFirstView,
  postInsuranceInformation,
  postSign,
  postSignRemuneration,
} from "@api/requests";
import { optimizelyAuthenticationSuccess } from "@utils/optimizely";
import { setInitialFilesData, setIsCorrectFiles, setIsCorrectInsurance, setIsCorrectSurvey } from "./slice";
import {
  selectPayloadForClientSurvey,
  selectPayloadForFiles,
  selectPayloadForInsuranceInformation,
  selectPayloadForSing,
} from "./selectors";

export const thunkGetConfigJson = createAsyncThunk<GetConfigJsonResponse, void, ThunkState>(
  "api/config",
  async (_, thunkAPI) => {
    try {
      const response = await getConfigJson();
      return thunkAPI.fulfillWithValue(response);
    } catch {
      return thunkAPI.rejectWithValue("error");
    }
  },
);

export const thunkGetAuthenticate = createAsyncThunk<GetAuthenticateResponse, void, ThunkState>(
  "api/authenticate",
  async (_, thunkApi) => {
    try {
      const { baseUrl, secret } = thunkApi.getState();
      const { data } = await getAuthenticate(baseUrl, secret);
      if (data.allowedPath === "/attachment" && data.attachmentSections) {
        thunkApi.dispatch(setInitialFilesData(data.attachmentSections));
        data.attachmentSections.forEach((s: AttachmentSection) => {
          switch (s.name) {
            case "insurance":
              thunkApi.dispatch(setIsCorrectInsurance(!!s.completed));
              break;
            case "files":
              thunkApi.dispatch(setIsCorrectFiles(!!s.completed));
              break;
            case "survey":
              thunkApi.dispatch(setIsCorrectSurvey(!!s.completed));
              break;
          }
        });
      }
      optimizelyAuthenticationSuccess(data);
      return thunkApi.fulfillWithValue(data);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

export const thunkPostFirstView = createAsyncThunk<PostFirstViewResponse, string, ThunkState>(
  "api/first-view",
  async (firstView, thunkApi) => {
    try {
      const { baseUrl, secret } = thunkApi.getState();
      const response = await postFirstView(baseUrl, secret, firstView);
      return thunkApi.fulfillWithValue(response);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

export const thunkGetSignature = createAsyncThunk<GetSignatureResponse, string, ThunkState>(
  "api/getsignature",
  async (fullName, thunkApi) => {
    try {
      const { baseUrl } = thunkApi.getState();
      const { data } = await getSignature(baseUrl, fullName);
      return thunkApi.fulfillWithValue(data);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

export const thunkPostSign = createAsyncThunk<PostSignResponse, void, ThunkState>("api/sign", async (_, thunkApi) => {
  try {
    const { baseUrl } = thunkApi.getState();
    const response = await postSign(baseUrl, selectPayloadForSing(thunkApi.getState()));
    return thunkApi.fulfillWithValue(response);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const thunkPostSignRemuneration = createAsyncThunk<PostSignResponse, void, ThunkState>(
  "api/sign/remuneration",
  async (_, thunkApi) => {
    try {
      const { baseUrl } = thunkApi.getState();
      const response = await postSignRemuneration(baseUrl, selectPayloadForSing(thunkApi.getState()));
      return thunkApi.fulfillWithValue(response);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const thunkPostInsuranceInformation = createAsyncThunk<PostInsuranceInformationResponse, void, ThunkState>(
  "api/insurance-information",
  async (_, thunkApi) => {
    try {
      const { baseUrl } = thunkApi.getState();
      const response = await postInsuranceInformation(
        baseUrl,
        selectPayloadForInsuranceInformation(thunkApi.getState()),
      );
      thunkApi.dispatch(setIsCorrectInsurance(true));
      return thunkApi.fulfillWithValue(response);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

export const thunkPostClientSurvey = createAsyncThunk<PostClientSurveyResponse, void, ThunkState>(
  "api/client-survey",
  async (_, thunkApi) => {
    try {
      const { baseUrl } = thunkApi.getState();
      const response = await postClientSurvey(baseUrl, selectPayloadForClientSurvey(thunkApi.getState()));
      return thunkApi.fulfillWithValue(response);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

export const thunkPostFiles = createAsyncThunk<PostFilesResponse, void, ThunkState>(
  "api/files",
  async (_, thunkApi) => {
    try {
      const { baseUrl } = thunkApi.getState();
      const { data } = await postFiles(baseUrl, selectPayloadForFiles(thunkApi.getState()));
      return thunkApi.fulfillWithValue(data);
    } catch {
      return thunkApi.rejectWithValue("error");
    }
  },
);

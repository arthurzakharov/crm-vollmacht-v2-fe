import type { AxiosResponse } from "axios";
import type { AttachmentSectionName, Status } from "@types";
import type { ReactNode } from "react";

export {};

type OptimizelyEvent = {
  type: "user" | "page";
  attributes?: unknown;
  pageName?: unknown;
};

declare global {
  interface Window {
    origin: string;
    optimizely: OptimizelyEvent[];
    innerWidth: number;
    innerHeight: number;
  }

  type SurveyQuestion =
    | "carOwner"
    | "carOwnerExtended"
    | "relationshipOwnerDriver"
    | "additionalLegalInsurance"
    | "additionalLegalInsuranceExtended"
    | "waiverOnDrivingBanImportant"
    | "waiverOnDrivingBanImportantExtended"
    | "additionalInformation";
  type InsuranceQuestion = "insuranceName" | "insuranceNumber";
  type InputRadioOption = {
    value: string;
    label: string;
  };
  type DropdownOption = {
    label: string;
    value: string;
  };
  type ValidationResult<T> = { [key in T]: boolean };
  type ValidationStatus<T> = { [key in T]: Status };
  type Validation<T> = {
    touched: T[];
    isCorrect: boolean;
    isDirty: boolean;
    result: ValidationResult<T>;
    status: ValidationStatus<T>;
  };
  // Api Redux Slice
  type ApiCallStatus = "pending" | "fulfilled" | "rejected" | "idle";
  // General Redux Slice
  type FormStepType = "form-personal" | "form-address" | "form-checkout" | "form-remuneration";
  type Variation = "a" | "b" | "c";
  type Page = "home" | "remuneration" | "attachment" | "error";
  type FormPersonalFieldType = "salutation" | "firstName" | "lastName" | "birthName" | "birthDate" | "birthCity";
  type FormAddressFieldType = "street" | "houseNumber" | "postCode" | "city";

  interface Window {
    useAlternateCta?: boolean;
  }

  type CheckoutField =
    | "powerOfAttorneyAgreement"
    | "agreedToLawInsuranceRequest"
    | "dropRevocationAgreement"
    | "remunerationAgreement"
    | "signature";
  type Coverage = "self-pay" | "arag-protection" | "legal-pay";
  type WhereSecret = "query" | "path";
  type Dialog =
    | "data-protection"
    | "general-info"
    | "imprint"
    | "mandate-condition"
    | "powers"
    | "right-for-refund"
    | "compensation-agreement"
    | "compensation-agreement-on-penalties"
    | "upload-confirmation"
    | "upload-completed"
    | "file-size"
    | "upload-category";
  type DialogPosition = "top" | "center";
  type AttachmentStep = "form-insurance" | "form-files" | "form-survey";
  type SidebarStep = {
    key: FormStepType | AttachmentStep;
    title: string;
  };
  type InsuranceType = "default" | "arag";
  type Poa =
    | "insurance"
    | "insuranceA"
    | "insuranceB"
    | "noInsurance"
    | "noInsuranceA"
    | "noInsuranceB"
    | "noInsurance500"
    | "noInsuranceDiscounted"
    | "insuranceMaybe"
    | "insuranceMaybe500"
    | "insuranceUncertain500Automatic"
    | "alcohol400"
    | "alcohol500"
    | "alcohol1000"
    | "insuranceArag"
    | "insuranceAragVerso"
    | "insuranceAragUncertain"
    | "insuranceAragUncertain500"
    | "withoutRsv400Court"
    | "RA250"
    | "RA300"
    | "RA400"
    | "RA500"
    | "RA700"
    | "RA1000"
    | "insuranceUncertain500DeutscheDirektVersicherung";
  type Personal = {
    salutation: string;
    firstName: string;
    lastName: string;
    birthName: string;
    birthDate: string;
    birthCity: string;
  };
  type PersonalKey = keyof Personal;
  type Address = {
    street: string;
    houseNumber: string;
    postCode: string;
    city: string;
  };
  type AllowedPath = "/" | "/attachment" | "/remuneration";
  type AddressKey = keyof Address;
  type AttachmentSection = {
    completed: boolean | null;
    index: number;
    name: AttachmentSectionName;
    data?: {
      documentType: string[];
      uploadsCount: number;
    };
  };
  type AttachmentSectionListItem = {
    title: string;
    section: AttachmentSection;
    element: ReactNode;
  };
  type PoaData = {
    customerData: CustomerData;
    hasInsurance: boolean;
    insuranceType: InsuranceType;
    latestSentPoaType: Poa;
    showAragSwitch: boolean;
    showSwitch: boolean;
    switchPoaType: Poa;
    switchTotal: number;
  };
  type CustomerData = {
    agreedToLawInsuranceRequest: boolean | null;
    birthCity: string;
    birthDate: string;
    birthName: string;
    city: string;
    dropRevocationAgreement: boolean | null;
    firstName: string;
    houseNumber: string;
    isAragSwitched: null;
    isSwitched: null;
    lastName: string;
    postCode: string;
    powerOfAttorneyAgreement: boolean | null;
    salutation: string;
    signature: string | null;
    street: string;
  };
  // API Responses
  type GetConfigJsonResponse = {
    NODE_ENV: string;
    API_URL: string;
  };
  type GetAuthenticateResponse = {
    allowedPath: AllowedPath;
    attachmentSections: AttachmentSection[] | null;
    caseGroupLawyerNames: string;
    charge: string;
    firstViewUrl: string | null;
    fullName: string;
    poaData: PoaData | null;
    reference: string;
    total: number;
    uploadUuid: string | null;
  };
  type PostFirstViewResponse = AxiosResponse;
  type GetSignatureResponse = {
    raw: string;
  };
  // API Payloads
  type PostFirstViewPayload = {
    secret: string;
    url: string;
  };
  type PostSignPayload = {
    salutation: string;
    firstName: string;
    lastName: string;
    birthName: string;
    birthDate: string;
    birthCity: string;
    street: string;
    houseNumber: string;
    postCode: string;
    city: string;
    signature: string;
    powerOfAttorneyAgreement: boolean | null;
    agreedToLawInsuranceRequest: boolean | null;
    dropRevocationAgreement: boolean | null;
    remunerationAgreement: boolean | null;
    secret: string;
    isSwitched: boolean;
    isAragSwitched: boolean;
  };
  type PostSignResponse = AxiosResponse;
  type PostInsuranceInformationPayload = {
    insuranceName: string;
    insuranceNumber: string;
    secret: string;
  };
  type PostClientSurveyPayload = {
    additionalInformation: string;
    additionalLegalInsurance: string;
    carDriver: string;
    carOwner: string;
    chargeDate: string;
    relationshipOwnerDriver: string;
    secret: string;
    waiverOnDrivingBanImportant: boolean;
  };
  type PostInsuranceInformationResponse = AxiosResponse;
  type PostClientSurveyResponse = AxiosResponse;
  type PostFilesResponse = { uploadUuid: string };
  type PostFilesPayload = FormData;
}

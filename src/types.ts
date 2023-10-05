export type Size = "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";

export type Status = "neutral" | "success" | "error";

export type Color = "blue" | "gray" | "orange" | "white";

export type AttachmentSectionName = "insurance" | "files" | "survey";

export type Option = {
  value: string;
  label: string;
};

export type Store = {
  baseUrl: string;
  secret: string;
  isBirthDateEmpty: boolean;
  remunerationAgreement: boolean;
  insuranceName: string;
  insuranceNumber: string;
  additionalInformation: string;
  additionalLegalInsurance: string;
  additionalLegalInsuranceExtended: string;
  carOwner: string;
  carOwnerExtended: string;
  relationshipOwnerDriver: string;
  waiverOnDrivingBanImportant: string;
  waiverOnDrivingBanImportantExtended: string;
  files: {
    list: string[];
    filesToUpload: File[];
    uploadingMore: boolean;
    completed: boolean;
    category: string | null;
  };
  statuses: {
    getConfigJson: ApiCallStatus;
    getAuthenticate: ApiCallStatus;
    postFirstView: ApiCallStatus;
    getSignature: ApiCallStatus;
    postSign: ApiCallStatus;
    postSignRemuneration: ApiCallStatus;
    postInsuranceInformation: ApiCallStatus;
    postClientSurvey: ApiCallStatus;
    postFiles: ApiCallStatus;
  };
  authentication: GetAuthenticateResponse | null;
  formStep: FormStepType | null;
  formTitle: string;
  formSubtitle: string;
  currentPage: Page | null;
  variation: Variation | null;
  coverage: Coverage | null;
  isLeadSwitched: boolean;
  isLeadSigning: boolean;
  activeAttachmentSection: AttachmentSectionName | null;
  noBoxOnStrafsachen: boolean;
  personal: Validation<FormPersonalFieldType>;
  address: Validation<FormAddressFieldType>;
  checkout: {
    submitClickCount: number;
    isMoneySectionShown: boolean;
    errors: CheckoutField[];
    mandatory: CheckoutField[];
  };
  attachment: {
    isCorrectInsurance: boolean;
    isCorrectFiles: boolean;
    isCorrectSurvey: boolean;
  };
  dialog: {
    name: Dialog | null;
    position: DialogPosition | null;
    size: Size | null;
    payload: unknown;
  };
};

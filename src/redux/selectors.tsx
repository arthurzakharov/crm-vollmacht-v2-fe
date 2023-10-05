import type { Status, AttachmentSectionName } from "@types";
import type { FileRejection } from "react-dropzone";
import type { AppReduxStore } from "./store";
import Cookies from "js-cookie";
import { createSelector } from "@reduxjs/toolkit";
import { Files } from "@organisms/files";
import { Insurance } from "@organisms/insurance";
import { Survey } from "@organisms/survey";
import { convertDate, fileSize, sourceFromSearch } from "@utils/application";

const selectStore = (state: AppReduxStore): AppReduxStore => state;

export const selectAuthentication = (store: AppReduxStore) => store.authentication;

export const selectPoaData = createSelector(
  [selectAuthentication],
  (authentication) => authentication?.poaData || null,
);

export const selectCustomerData = createSelector([selectPoaData], (poaData) => poaData?.customerData || null);

export const selectAttachmentSections = createSelector(
  [selectAuthentication],
  (authentication) => authentication?.attachmentSections || null,
);

export const selectAttachmentSectionsListItems = createSelector([selectAttachmentSections], (sections) => {
  if (sections) {
    const getAttachmentSectionTitle = (name: AttachmentSectionName) => {
      switch (name) {
        case "insurance":
          return "Rechtsschutzversicherung";
        case "files":
          return "Behördenschreiben";
        case "survey":
          return "Weitere Informationen";
      }
    };
    const getAttachmentSectionContent = (name: AttachmentSectionName) => {
      switch (name) {
        case "insurance":
          return <Insurance />;
        case "files":
          return <Files />;
        case "survey":
          return <Survey />;
      }
    };
    return sections.map(
      (attachmentSection: AttachmentSection) =>
        ({
          title: getAttachmentSectionTitle(attachmentSection.name),
          section: attachmentSection,
          element: getAttachmentSectionContent(attachmentSection.name),
        }) as AttachmentSectionListItem,
    );
  } else {
    return [];
  }
});

export const selectAttachmentSectionData = createSelector(
  [selectStore, selectAttachmentSectionsListItems],
  (store, list) => ({
    activeSection: store.activeAttachmentSection,
    hasInsurance: list.findIndex((l) => l.section.name === "insurance") >= 0,
    list,
  }),
);

export const getMainData = createSelector([selectStore, selectAuthentication], (store, authentication) => ({
  currentPage: store.currentPage,
  formTitle: store.formTitle,
  formSubtitle: store.formSubtitle,
  charge: authentication ? authentication.charge : "",
  reference: authentication ? authentication.reference : "",
}));

const selectPersonal = createSelector([selectStore], (store) => store.personal);

const selectAddress = createSelector([selectStore], (store) => store.address);

const selectCheckout = createSelector([selectStore], (store) => store.checkout);

export const selectCheckoutSubmitClickCount = createSelector([selectCheckout], (checkout) => checkout.submitClickCount);

export const selectCheckoutErrors = createSelector([selectCheckout], (checkout) => checkout.errors);

export const selectDialogData = createSelector([selectStore], (store) => ({
  name: store.dialog.name,
  position: store.dialog.position,
  size: store.dialog.size,
}));

export const selectSubmitButtonData = createSelector([selectStore, selectCheckout], (store, checkout) => ({
  secret: store.secret,
  baseUrl: store.baseUrl,
  currentPage: store.currentPage,
  isLeadSigning: store.isLeadSigning,
  coverage: store.coverage,
  errors: checkout.errors,
}));

// TODO: Potential rare error place need to add custom type-guard
export const selectDialogFileSizeData = createSelector([selectStore], (store) => ({
  files: Array.isArray(store.dialog.payload)
    ? store.dialog.payload.map(({ file }: FileRejection) => ({
        name: file.name,
        size: fileSize(file.size),
      }))
    : [],
}));

export const selectDialogRightForRefundData = createSelector([selectStore], (store) => ({
  caseGroupLawyerNames: store.authentication?.caseGroupLawyerNames || "",
}));

export const selectDialogCompensationAgreementOnPenaltiesData = createSelector(
  [selectAuthentication, selectCustomerData, selectPoaData],
  (auth, customerData, poaData) => ({
    charge: auth?.charge || "",
    total: auth?.total || 0,
    switchTotal: poaData?.switchTotal || 0,
    latestSentPoaType: poaData?.latestSentPoaType,
    firstName: customerData?.firstName || "",
    lastName: customerData?.lastName || "",
    birthName: customerData?.birthName || "",
    birthDate: customerData?.birthDate || "",
    street: customerData?.street || "",
    houseNumber: customerData?.houseNumber || "",
    postCode: customerData?.postCode || "",
    city: customerData?.city || "",
  }),
);

export const selectFormPersonalData = createSelector(
  [selectStore, selectPersonal, selectCustomerData],
  (store, personal, customerData) => ({
    currentPage: store.currentPage,
    isBirthDateEmpty: store.isBirthDateEmpty,
    isFormPersonalCorrect: personal.isCorrect,
    formPersonalStatus: personal.status,
    salutation: customerData?.salutation || "",
    firstName: customerData?.firstName || "",
    lastName: customerData?.lastName || "",
    birthName: customerData?.birthName || "",
    birthDate: customerData?.birthDate || "",
    birthCity: customerData?.birthCity || "",
  }),
);

export const selectFormAddressData = createSelector(
  [selectStore, selectAddress, selectCustomerData],
  (store, address, customerData) => ({
    currentPage: store.currentPage,
    isBirthDateEmpty: store.isBirthDateEmpty,
    isFormAddressCorrect: address.isCorrect,
    formAddressStatus: address.status,
    street: customerData?.street || "",
    houseNumber: customerData?.houseNumber || "",
    postCode: customerData?.postCode || "",
    city: customerData?.city || "",
  }),
);

export const selectFormRemunerationData = createSelector(
  [selectStore, selectAuthentication, selectCustomerData, selectCheckoutErrors, selectCheckoutSubmitClickCount],
  (store, auth, data, errors, submitClickCount) => ({
    total: auth?.total || 0,
    birthDate: data?.birthDate || "",
    value: store.remunerationAgreement,
    status: errors.includes("remunerationAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
  }),
);

export const selectCheckoutNewPartData = createSelector(
  [selectAuthentication, selectCustomerData, selectCheckoutErrors, selectCheckoutSubmitClickCount],
  (auth, customerData, errors, submitClickCount) => ({
    caseGroupLawyerNames: auth?.caseGroupLawyerNames || "",
    powerOfAttorneyAgreement: !!customerData?.powerOfAttorneyAgreement,
    dropRevocationAgreement: !!customerData?.dropRevocationAgreement,
    powerOfAttorneyAgreementStatus:
      errors.includes("powerOfAttorneyAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
    dropRevocationAgreementStatus:
      errors.includes("dropRevocationAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
  }),
);

export const selectCheckoutOldPartData = createSelector(
  [
    selectStore,
    selectAuthentication,
    selectPoaData,
    selectCustomerData,
    selectCheckoutErrors,
    selectCheckoutSubmitClickCount,
  ],
  (store, authentication, poaData, customerData, errors, submitClickCount) => ({
    caseGroupLawyerNames: authentication?.caseGroupLawyerNames || "",
    total: authentication?.total || 0,
    switchTotal: poaData?.switchTotal || 0,
    poaType: poaData?.latestSentPoaType,
    variation: store.variation,
    isLeadSwitched: store.isLeadSwitched,
    noBoxOnStrafsachen: store.noBoxOnStrafsachen,
    isMoneySectionShown: store.checkout.isMoneySectionShown,
    remunerationAgreement: store.remunerationAgreement,
    dropRevocationAgreement: !!customerData?.dropRevocationAgreement,
    agreedToLawInsuranceRequest: !!customerData?.agreedToLawInsuranceRequest,
    powerOfAttorneyAgreement: !!customerData?.powerOfAttorneyAgreement,
    remunerationAgreementStatus:
      errors.includes("remunerationAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
    dropRevocationAgreementStatus:
      errors.includes("dropRevocationAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
    agreedToLawInsuranceRequestStatus:
      errors.includes("agreedToLawInsuranceRequest") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
    powerOfAttorneyAgreementStatus:
      errors.includes("powerOfAttorneyAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
  }),
);

export const selectSignatureData = createSelector([selectStore], (store) => ({
  submitClickCount: store.checkout.submitClickCount,
  status: store.statuses.getSignature,
  fullName: store.authentication?.fullName || "",
  signature: store.authentication?.poaData?.customerData?.signature || "",
}));

export const selectCoverageSelectorData = createSelector(
  [
    selectStore,
    selectAuthentication,
    selectPoaData,
    selectCustomerData,
    selectCheckoutErrors,
    selectCheckoutSubmitClickCount,
  ],
  (store, authentication, poaData, customerData, errors, submitClickCount) => ({
    total: authentication?.total || 0,
    switchTotal: poaData?.switchTotal || 0,
    poaType: poaData?.latestSentPoaType,
    coverage: store.coverage,
    remunerationAgreement: store.remunerationAgreement,
    agreedToLawInsuranceRequest: !!customerData?.agreedToLawInsuranceRequest,
    remunerationAgreementStatus:
      errors.includes("remunerationAgreement") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
    agreedToLawInsuranceRequestStatus:
      errors.includes("agreedToLawInsuranceRequest") && submitClickCount ? ("error" as Status) : ("neutral" as Status),
  }),
);

export const selectUploaderData = createSelector([selectStore], (store) => ({
  list: store.files.list,
  filesToUpload: store.files.filesToUpload,
  category: store.files.category,
  uploadingMore: store.files.uploadingMore,
  status: store.statuses.postFiles,
}));

export const selectSurveyData = createSelector([selectStore], (store) => ({
  carOwner: store.carOwner,
  carOwnerExtended: store.carOwnerExtended,
  relationshipOwnerDriver: store.relationshipOwnerDriver,
  additionalInformation: store.additionalInformation,
  additionalLegalInsurance: store.additionalLegalInsurance,
  additionalLegalInsuranceExtended: store.additionalLegalInsuranceExtended,
  waiverOnDrivingBanImportant: store.waiverOnDrivingBanImportant,
  waiverOnDrivingBanImportantExtended: store.waiverOnDrivingBanImportantExtended,
  status: store.statuses.postClientSurvey,
}));

export const selectPageRemunerationData = createSelector([selectStore], (store) => ({
  formStep: store.formStep,
  isBirthDateEmpty: store.isBirthDateEmpty,
}));

export const selectUseValidateData = createSelector([selectStore, selectCustomerData], (store, customerData) => ({
  salutation: customerData?.salutation || "",
  firstName: customerData?.firstName || "",
  lastName: customerData?.lastName || "",
  birthName: customerData?.birthName || "",
  birthDate: customerData?.birthDate || "",
  birthCity: customerData?.birthCity || "",
  street: customerData?.street || "",
  houseNumber: customerData?.houseNumber || "",
  postCode: customerData?.postCode || "",
  city: customerData?.city || "",
  isFormPersonalDirty: store.personal.isDirty,
  isFormAddressDirty: store.address.isDirty,
  formPersonalTouched: store.personal.touched,
  formAddressTouched: store.address.touched,
  formPersonalResult: store.personal.result,
  formAddressResult: store.address.result,
}));

export const selectUseToFirstUrlData = createSelector([selectStore, selectAuthentication], (store, authentication) => ({
  secret: store.secret,
  firstViewUrl: authentication?.firstViewUrl || null,
  allowedPath: authentication?.allowedPath,
  status: store.statuses.getAuthenticate,
}));

export const selectUseToAllowedPath = createSelector([selectStore, selectAuthentication], (store, authentication) => ({
  secret: store.secret,
  firstViewUrl: authentication?.firstViewUrl || null,
  allowedPath: authentication?.allowedPath,
  status: store.statuses.getAuthenticate,
}));

export const selectUsePostFirstView = createSelector([selectStore, selectAuthentication], (store, authentication) => ({
  currentPage: store.currentPage,
  firstViewUrl: authentication?.firstViewUrl || null,
}));

export const selectUseGetAuthenticate = createSelector([selectStore], (store) => ({
  baseUrl: store.baseUrl,
  secret: store.secret,
  authentication: store.authentication,
}));

export const selectUseCheckoutRefs = createSelector([selectStore, selectCustomerData], (store, customerData) => ({
  currentPage: store.currentPage,
  isOldCheckoutShown: store.variation === "a" || store.variation === "c",
  isNewCheckoutShown: store.variation === "b",
  checkoutMandatory: store.checkout.mandatory,
  checkoutSubmitClickCount: store.checkout.submitClickCount,
  checkoutIsMoneySectionShown: store.checkout.isMoneySectionShown,
  remunerationAgreement: store.remunerationAgreement,
  powerOfAttorneyAgreement: !!customerData?.powerOfAttorneyAgreement,
  agreedToLawInsuranceRequest: !!customerData?.agreedToLawInsuranceRequest,
  signature: customerData?.signature || "",
  checkoutFieldsState: {
    powerOfAttorneyAgreement:
      store.checkout.errors.includes("powerOfAttorneyAgreement") && store.checkout.submitClickCount
        ? "error"
        : "neutral",
    agreedToLawInsuranceRequest:
      store.checkout.errors.includes("agreedToLawInsuranceRequest") && store.checkout.submitClickCount
        ? "error"
        : "neutral",
    dropRevocationAgreement:
      store.checkout.errors.includes("dropRevocationAgreement") && store.checkout.submitClickCount
        ? "error"
        : "neutral",
    remunerationAgreement:
      store.checkout.errors.includes("remunerationAgreement") && store.checkout.submitClickCount ? "error" : "neutral",
    signature: store.checkout.errors.includes("signature") && store.checkout.submitClickCount ? "error" : "neutral",
  },
}));

export const selectPayloadForClientSurvey = createSelector(
  [selectStore, selectAuthentication],
  (store, authentication) => ({
    secret: store.secret || "",
    waiverOnDrivingBanImportant: !(
      store.waiverOnDrivingBanImportant === "false" || store.waiverOnDrivingBanImportantExtended === "false"
    ),
    carOwner: store.carOwner === "true" ? authentication?.fullName || "" : store.carOwnerExtended,
    relationshipOwnerDriver: store.relationshipOwnerDriver,
    additionalLegalInsurance:
      store.additionalLegalInsurance === "false" ? "Nein" : store.additionalLegalInsuranceExtended,
    additionalInformation: store.additionalInformation,
    chargeDate: "",
    carDriver: "",
  }),
);

export const selectPayloadForSing = createSelector(
  [selectStore, selectPoaData, selectCustomerData],
  (store, poaData, customerData) => ({
    salutation: customerData?.salutation || "",
    firstName: customerData?.firstName || "",
    lastName: customerData?.lastName || "",
    birthName: customerData?.birthName || "",
    birthDate: convertDate(customerData?.birthDate || ""),
    birthCity: customerData?.birthCity || "",
    street: customerData?.street || "",
    houseNumber: customerData?.houseNumber || "",
    postCode: customerData?.city || "",
    city: customerData?.city || "",
    signature: customerData?.signature || "",
    powerOfAttorneyAgreement: !!customerData?.powerOfAttorneyAgreement,
    agreedToLawInsuranceRequest: !!customerData?.agreedToLawInsuranceRequest,
    dropRevocationAgreement: !!customerData?.dropRevocationAgreement,
    remunerationAgreement: store.remunerationAgreement,
    secret: store.secret || "",
    isSwitched: store.isLeadSwitched,
    isAragSwitched: poaData?.insuranceType === "arag",
  }),
);

export const selectPayloadForInsuranceInformation = createSelector([selectStore], (store) => ({
  insuranceName: store.insuranceName,
  insuranceNumber: store.insuranceNumber,
  secret: store.secret || "",
}));

// TODO: Check if uploadUuid is refreshed each time
export const selectPayloadForFiles = createSelector([selectStore, selectAuthentication], (store, authentication) => {
  const secret = store.secret || "";
  const uploadUuid = authentication?.uploadUuid || "";
  const uploadedFiles = store.files.list;
  const formData = new FormData();
  if (secret && uploadUuid && uploadedFiles.length) {
    uploadedFiles.forEach((uploadedFile, i) => formData.append(`files[${i}]`, uploadedFile));
    formData.append("secret", secret);
    formData.append("uploadUuid", uploadUuid);
    formData.append("document_type", store.files.category || "undefined");
    formData.append("optimizely", Cookies.get("optimizely_data") || "undefined");
    formData.append("optimizely_visitor_id", Cookies.get("optimizely_visitor_id") || "undefined");
    formData.append("source", sourceFromSearch());
  }
  return formData;
});

// HOOKS' SELECTORS
export const selectUseGetConfigJsonData = createSelector([selectStore], (store) => ({
  baseUrl: store.baseUrl,
}));

// COMPONENTS' SELECTORS
export const selectTemplateDefaultData = createSelector([selectStore], (store) => ({
  fulfilled:
    store.statuses.getConfigJson === "fulfilled" &&
    store.statuses.getAuthenticate === "fulfilled" &&
    (store.statuses.postFirstView === "fulfilled" || store.statuses.postFirstView === "idle"),
  rejected:
    store.statuses.getConfigJson === "rejected" ||
    store.statuses.getAuthenticate === "rejected" ||
    store.statuses.postFirstView === "rejected",
}));

export const selectPageAttachmentData = createSelector([selectAuthentication], (authentication) => ({
  sections: authentication?.attachmentSections || null,
}));

export const selectPageHomeData = createSelector([selectStore], (store) => store.formStep);

export const selectSidebarData = createSelector([selectStore, selectAttachmentSections], (store, sections) => ({
  currentPage: store.currentPage,
  formStep: store.formStep,
  isBirthDateEmpty: store.isBirthDateEmpty,
  isFormPersonalCorrect: store.personal.isCorrect,
  isFormAddressCorrect: store.address.isCorrect,
  isCorrectInsurance: store.attachment.isCorrectInsurance,
  isCorrectFiles: store.attachment.isCorrectFiles,
  isCorrectSurvey: store.attachment.isCorrectSurvey,
  attachmentSectionNames: sections?.map(({ name }) => name) || [],
}));

export const selectFilesData = createSelector([selectStore], (store) => ({
  activeSection: store.activeAttachmentSection,
  completed: store.files.completed,
}));

export const customerInfoData = createSelector([selectStore, selectCustomerData], (store, customerData) => ({
  formStep: store.formStep,
  isBirthDateEmpty: store.isBirthDateEmpty,
  salutation: customerData?.salutation || "",
  firstName: customerData?.firstName || "",
  lastName: customerData?.lastName || "",
  birthName: customerData?.birthName || "",
  birthDate: customerData?.birthDate || "",
  birthCity: customerData?.birthCity || "",
  street: customerData?.street || "",
  houseNumber: customerData?.houseNumber || "",
  postCode: customerData?.postCode || "",
  city: customerData?.city || "",
}));

export const selectFormCheckoutData = createSelector([selectStore], (store) => ({
  useOldVersion: store.variation === "a" || store.variation === "c",
  useNewVersion: store.variation === "b",
}));

export const selectSidebarInfoData = createSelector([selectStore, selectAuthentication], (store, authentication) => ({
  formStep: store.formStep,
  currentPage: store.currentPage,
  charge: authentication?.charge || "",
  reference: authentication?.reference || "",
}));

export const selectInsuranceData = createSelector([selectStore], (store) => ({
  name: store.insuranceName,
  number: store.insuranceNumber,
  status: store.statuses.postInsuranceInformation,
}));

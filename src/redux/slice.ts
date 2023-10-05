import type { Size, Store, AttachmentSectionName } from "@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectAttachmentSections } from "./selectors";
import {
  thunkGetAuthenticate,
  thunkGetConfigJson,
  thunkGetSignature,
  thunkPostClientSurvey,
  thunkPostFiles,
  thunkPostFirstView,
  thunkPostInsuranceInformation,
  thunkPostSign,
  thunkPostSignRemuneration,
} from "./thunks";
import initialState from "./initial-state";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSecret(state, action: PayloadAction<string>) {
      state.secret = action.payload;
    },
    setRemunerationAgreement(state, action: PayloadAction<boolean>) {
      state.remunerationAgreement = action.payload;
    },
    setInsuranceName(state, action: PayloadAction<string>) {
      state.insuranceName = action.payload;
    },
    setInsuranceNumber(state, action: PayloadAction<string>) {
      state.insuranceNumber = action.payload;
    },
    setAdditionalInformation(state, action: PayloadAction<string>) {
      state.additionalInformation = action.payload;
    },
    setAdditionalLegalInsurance(state, action: PayloadAction<string>) {
      state.additionalLegalInsurance = action.payload;
    },
    setAdditionalLegalInsuranceExtended(state, action: PayloadAction<string>) {
      state.additionalLegalInsuranceExtended = action.payload;
    },
    setCarOwner(state, action: PayloadAction<string>) {
      state.carOwner = action.payload;
    },
    setCarOwnerExtended(state, action: PayloadAction<string>) {
      state.carOwnerExtended = action.payload;
    },
    setRelationshipOwnerDriver(state, action: PayloadAction<string>) {
      state.relationshipOwnerDriver = action.payload;
    },
    setWaiverOnDrivingBanImportant(state, action: PayloadAction<string>) {
      state.waiverOnDrivingBanImportant = action.payload;
    },
    setWaiverOnDrivingBanImportantExtended(state, action: PayloadAction<string>) {
      state.waiverOnDrivingBanImportantExtended = action.payload;
    },
    setFilesCategory(state, action: PayloadAction<string | null>) {
      state.files.category = action.payload;
    },
    setFilesToUpload(state, action: PayloadAction<File[]>) {
      state.files.filesToUpload = action.payload;
    },
    setFilesUploadingMore(state, action: PayloadAction<boolean>) {
      state.files.uploadingMore = action.payload;
    },
    setAuthentication(state, action: PayloadAction<GetAuthenticateResponse>) {
      state.authentication = action.payload;
    },
    setFormPersonalKey(state, action: PayloadAction<{ key: FormPersonalFieldType; value: string }>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData)
        state.authentication.poaData.customerData[action.payload.key] = action.payload.value;
    },
    setFormAddressKey(state, action: PayloadAction<{ key: FormAddressFieldType; value: string }>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData)
        state.authentication.poaData.customerData[action.payload.key] = action.payload.value;
    },
    setPowerOfAttorneyAgreement(state, action: PayloadAction<boolean>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData)
        state.authentication.poaData.customerData.powerOfAttorneyAgreement = action.payload;
    },
    setAgreedToLawInsuranceRequest(state, action: PayloadAction<boolean>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData)
        state.authentication.poaData.customerData.agreedToLawInsuranceRequest = action.payload;
    },
    setDropRevocationAgreement(state, action: PayloadAction<boolean>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData)
        state.authentication.poaData.customerData.dropRevocationAgreement = action.payload;
    },
    setSignature(state, action: PayloadAction<string>) {
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData) {
        state.authentication.poaData.customerData.signature = action.payload;
      }
    },
    openDialog(
      state,
      action: PayloadAction<{
        dialog: Dialog;
        position?: DialogPosition;
        size?: Size;
        payload?: unknown;
      }>,
    ) {
      state.dialog.name = action.payload.dialog;
      state.dialog.position = action.payload.position || "center";
      state.dialog.size = action.payload.size || "m";
      state.dialog.payload = action.payload.payload || null;
    },
    closeDialog(state) {
      state.dialog.name = null;
    },
    resetDialogStyles(state) {
      state.dialog.position = null;
      state.dialog.size = null;
      state.dialog.payload = null;
    },
    setFormStep(state, action: PayloadAction<FormStepType | null>) {
      state.formStep = action.payload;
    },
    setFormTitle(state, action: PayloadAction<string>) {
      state.formTitle = action.payload;
    },
    setFormSubtitle(state, action: PayloadAction<string>) {
      state.formSubtitle = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<Page | null>) {
      state.currentPage = action.payload;
    },
    setVariation(state, action: PayloadAction<Variation | null>) {
      state.variation = action.payload;
    },
    setCoverage(state, action: PayloadAction<Coverage | null>) {
      state.coverage = action.payload;
    },
    setIsLeadSwitched(state, action: PayloadAction<boolean>) {
      state.isLeadSwitched = action.payload;
    },
    setIsLeadSigning(state, action: PayloadAction<boolean>) {
      state.isLeadSigning = action.payload;
    },
    setActiveAttachmentSection(state, action: PayloadAction<AttachmentSectionName | null>) {
      state.activeAttachmentSection = action.payload;
    },
    setNoBoxOnStrafsachen(state, action: PayloadAction<boolean>) {
      state.noBoxOnStrafsachen = action.payload;
    },
    setTouchedPersonalFormKeys(state, action: PayloadAction<FormPersonalFieldType>) {
      state.personal.touched = Array.from(new Set([...state.personal.touched, action.payload]));
    },
    setTouchedAddressFormKeys(state, action: PayloadAction<FormAddressFieldType>) {
      state.address.touched = Array.from(new Set([...state.address.touched, action.payload]));
    },
    setPersonalFormIsCorrect(state, action: PayloadAction<boolean>) {
      state.personal.isCorrect = action.payload;
    },
    setAddressFormIsCorrect(state, action: PayloadAction<boolean>) {
      state.address.isCorrect = action.payload;
    },
    setPersonalFormIsDirty(state, action: PayloadAction<boolean>) {
      state.personal.isDirty = action.payload;
    },
    setAddressFormIsDirty(state, action: PayloadAction<boolean>) {
      state.address.isDirty = action.payload;
    },
    setPersonalFormResult(state, action: PayloadAction<ValidationResult<FormPersonalFieldType>>) {
      state.personal.result = action.payload;
    },
    setAddressFormResult(state, action: PayloadAction<ValidationResult<FormAddressFieldType>>) {
      state.address.result = action.payload;
    },
    setPersonalFormStatus(state, action: PayloadAction<ValidationStatus<FormPersonalFieldType>>) {
      state.personal.status = action.payload;
    },
    setAddressFormStatus(state, action: PayloadAction<ValidationStatus<FormAddressFieldType>>) {
      state.address.status = action.payload;
    },
    setCheckoutSubmitCount(state) {
      state.checkout.submitClickCount = state.checkout.submitClickCount + 1;
    },
    setCheckoutIsMoneySectionShown(state, action: PayloadAction<boolean>) {
      state.checkout.isMoneySectionShown = action.payload;
    },
    setCheckoutErrors(state, action: PayloadAction<CheckoutField[]>) {
      state.checkout.errors = action.payload;
    },
    setCheckoutMandatory(state, action: PayloadAction<CheckoutField[]>) {
      state.checkout.mandatory = action.payload;
    },
    setIsCorrectInsurance(state, action: PayloadAction<boolean>) {
      state.attachment.isCorrectInsurance = action.payload;
    },
    setIsCorrectFiles(state, action: PayloadAction<boolean>) {
      state.attachment.isCorrectFiles = action.payload;
    },
    setIsCorrectSurvey(state, action: PayloadAction<boolean>) {
      state.attachment.isCorrectSurvey = action.payload;
    },
    clickDialogUploadCompletedConfirm(state) {
      const sections = selectAttachmentSections(state) || [];
      const hasSurvey = sections.find(({ name }) => name === "survey");
      state.attachment.isCorrectFiles = true;
      state.files.list = [...state.files.list, state.files.category || "undefined"];
      state.files.filesToUpload = [];
      state.files.category = null;
      state.files.completed = true;
      state.files.uploadingMore = false;
      if (hasSurvey) state.activeAttachmentSection = "survey";
    },
    setInitialFilesData(state, action: PayloadAction<AttachmentSection[]>) {
      const files = action.payload.find(({ name }) => name === "files");
      state.files.list = files?.data?.documentType || [];
      state.files.completed = !!files?.completed;
      state.files.category = null;
    },
    resetToInitialState(_, action: PayloadAction<Store | null>) {
      return action.payload || initialState;
    },
  },
  extraReducers: (builder) => {
    // Get config.json
    builder.addCase(thunkGetConfigJson.pending, (state) => {
      state.statuses.getConfigJson = "pending";
    });
    builder.addCase(thunkGetConfigJson.fulfilled, (state, action) => {
      state.baseUrl = action.payload.API_URL;
      state.statuses.getConfigJson = "fulfilled";
    });
    builder.addCase(thunkGetConfigJson.rejected, (state) => {
      state.statuses.getConfigJson = "rejected";
    });
    // Get authenticate
    builder.addCase(thunkGetAuthenticate.pending, (state) => {
      state.statuses.getAuthenticate = "pending";
    });
    builder.addCase(thunkGetAuthenticate.fulfilled, (state, action) => {
      state.authentication = action.payload;
      state.isBirthDateEmpty = !action.payload.poaData?.customerData.birthDate;
      state.statuses.getAuthenticate = "fulfilled";
    });
    builder.addCase(thunkGetAuthenticate.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.getAuthenticate = "idle";
      if (action.payload === "error") state.statuses.getAuthenticate = "rejected";
    });
    // Post first view
    builder.addCase(thunkPostFirstView.pending, (state) => {
      state.statuses.postFirstView = "pending";
    });
    builder.addCase(thunkPostFirstView.fulfilled, (state) => {
      state.statuses.postFirstView = "fulfilled";
    });
    builder.addCase(thunkPostFirstView.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postFirstView = "idle";
      if (action.payload === "error") state.statuses.postFirstView = "rejected";
    });
    // Get signature
    builder.addCase(thunkGetSignature.pending, (state) => {
      state.statuses.getSignature = "pending";
    });
    builder.addCase(thunkGetSignature.fulfilled, (state, action) => {
      state.statuses.getSignature = "fulfilled";
      if (state.authentication && state.authentication.poaData && state.authentication.poaData.customerData) {
        state.authentication.poaData.customerData.signature = action.payload.raw;
      }
    });
    builder.addCase(thunkGetSignature.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.getSignature = "idle";
      if (action.payload === "error") state.statuses.getSignature = "rejected";
    });
    // Post sign
    builder.addCase(thunkPostSign.pending, (state) => {
      state.statuses.postSign = "pending";
    });
    builder.addCase(thunkPostSign.fulfilled, (state, data) => {
      if (data.payload.status !== 204) throw new Error();
      state.statuses.postSign = "fulfilled";
    });
    builder.addCase(thunkPostSign.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postSign = "idle";
      if (action.payload === "error") state.statuses.postSign = "rejected";
    });
    // Post sign remuneration
    builder.addCase(thunkPostSignRemuneration.pending, (state) => {
      state.statuses.postSignRemuneration = "pending";
    });
    builder.addCase(thunkPostSignRemuneration.fulfilled, (state, data) => {
      if (data.payload.status !== 204) throw new Error();
      state.statuses.postSignRemuneration = "fulfilled";
    });
    builder.addCase(thunkPostSignRemuneration.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postSignRemuneration = "idle";
      if (action.payload === "error") state.statuses.postSignRemuneration = "rejected";
    });
    // Post insurance-information
    builder.addCase(thunkPostInsuranceInformation.pending, (state) => {
      state.statuses.postInsuranceInformation = "pending";
    });
    builder.addCase(thunkPostInsuranceInformation.fulfilled, (state) => {
      state.statuses.postInsuranceInformation = "fulfilled";
      state.insuranceName = "";
      state.insuranceNumber = "";
      state.activeAttachmentSection = "files";
    });
    builder.addCase(thunkPostInsuranceInformation.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postInsuranceInformation = "idle";
      if (action.payload === "error") state.statuses.postInsuranceInformation = "rejected";
    });
    // Post client-survey
    builder.addCase(thunkPostClientSurvey.pending, (state) => {
      state.statuses.postClientSurvey = "pending";
    });
    builder.addCase(thunkPostClientSurvey.fulfilled, (state) => {
      state.statuses.postClientSurvey = "fulfilled";
    });
    builder.addCase(thunkPostClientSurvey.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postClientSurvey = "idle";
      if (action.payload === "error") state.statuses.postClientSurvey = "rejected";
    });
    // Post files
    builder.addCase(thunkPostFiles.pending, (state) => {
      state.statuses.postFiles = "pending";
    });
    builder.addCase(thunkPostFiles.fulfilled, (state, action) => {
      state.statuses.postFiles = "fulfilled";
      if (state.authentication) state.authentication.uploadUuid = action.payload.uploadUuid;
    });
    builder.addCase(thunkPostFiles.rejected, (state, action) => {
      if (action.payload === "abort") state.statuses.postFiles = "idle";
      if (action.payload === "error") state.statuses.postFiles = "rejected";
    });
  },
});

export const {
  setSecret,
  setRemunerationAgreement,
  setInsuranceName,
  setInsuranceNumber,
  setAdditionalInformation,
  setAdditionalLegalInsurance,
  setAdditionalLegalInsuranceExtended,
  setCarOwner,
  setCarOwnerExtended,
  setRelationshipOwnerDriver,
  setWaiverOnDrivingBanImportant,
  setWaiverOnDrivingBanImportantExtended,
  setFilesCategory,
  setFilesToUpload,
  setFilesUploadingMore,
  setAuthentication,
  setFormPersonalKey,
  setFormAddressKey,
  setPowerOfAttorneyAgreement,
  setAgreedToLawInsuranceRequest,
  setDropRevocationAgreement,
  setSignature,
  openDialog,
  closeDialog,
  resetDialogStyles,
  setFormStep,
  setFormTitle,
  setFormSubtitle,
  setCurrentPage,
  setVariation,
  setCoverage,
  setIsLeadSwitched,
  setIsLeadSigning,
  setActiveAttachmentSection,
  setNoBoxOnStrafsachen,
  setTouchedPersonalFormKeys,
  setTouchedAddressFormKeys,
  setPersonalFormIsCorrect,
  setAddressFormIsCorrect,
  setPersonalFormIsDirty,
  setAddressFormIsDirty,
  setPersonalFormResult,
  setAddressFormResult,
  setPersonalFormStatus,
  setAddressFormStatus,
  setCheckoutSubmitCount,
  setCheckoutIsMoneySectionShown,
  setCheckoutErrors,
  setCheckoutMandatory,
  setIsCorrectInsurance,
  setIsCorrectFiles,
  setIsCorrectSurvey,
  clickDialogUploadCompletedConfirm,
  setInitialFilesData,
  resetToInitialState,
} = slice.actions;

export default slice;

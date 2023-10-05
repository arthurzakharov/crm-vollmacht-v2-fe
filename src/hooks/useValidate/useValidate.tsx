import type { Status } from "@types";
import { useEffect } from "react";
import { isValidBirthDate } from "@utils/application";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  setAddressFormIsCorrect,
  setAddressFormResult,
  setAddressFormStatus,
  setPersonalFormIsCorrect,
  setPersonalFormResult,
  setPersonalFormStatus,
} from "@redux/slice";
import { selectUseValidateData } from "@redux/selectors";

export const useValidate = () => {
  const {
    salutation,
    firstName,
    lastName,
    birthName,
    birthDate,
    birthCity,
    street,
    houseNumber,
    postCode,
    city,
    isFormPersonalDirty,
    isFormAddressDirty,
    formPersonalTouched,
    formAddressTouched,
    formPersonalResult,
    formAddressResult,
  } = useAppSelector(selectUseValidateData);
  const dispatch = useAppDispatch();

  const setStatus = <T extends {}>(key: T, result: ValidationResult<T>, touched: T[], isDirty: boolean): Status => {
    if (result[key]) return "success";
    if (touched.includes(key) && !result[key]) return "error";
    if (isDirty && !result[key]) return "error";
    return "neutral";
  };

  const setPersonalFormKeyStatus = (key: FormPersonalFieldType): Status =>
    setStatus(key, formPersonalResult, formPersonalTouched, isFormPersonalDirty);

  const setAddressFormKeyStatus = (key: FormAddressFieldType): Status =>
    setStatus(key, formAddressResult, formAddressTouched, isFormAddressDirty);

  const setPersonalFormKeysStatuses = (): ValidationStatus<PersonalKey> => ({
    salutation: setPersonalFormKeyStatus("salutation"),
    firstName: setPersonalFormKeyStatus("firstName"),
    lastName: setPersonalFormKeyStatus("lastName"),
    birthName: birthName ? "success" : "neutral",
    birthDate: setPersonalFormKeyStatus("birthDate"),
    birthCity: setPersonalFormKeyStatus("birthCity"),
  });

  const setAddressFormKeysStatuses = (): ValidationStatus<AddressKey> => ({
    street: setAddressFormKeyStatus("street"),
    houseNumber: setAddressFormKeyStatus("houseNumber"),
    postCode: setAddressFormKeyStatus("postCode"),
    city: setAddressFormKeyStatus("city"),
  });

  const validatePersonalFormKeys = (): ValidationResult<PersonalKey> => ({
    salutation: salutation !== "",
    firstName: firstName !== "",
    lastName: lastName !== "",
    birthName: true,
    birthDate: isValidBirthDate(birthDate),
    birthCity: birthCity !== "",
  });

  const validateAddressFormKeys = (): ValidationResult<AddressKey> => ({
    street: street !== "",
    houseNumber: houseNumber !== "",
    postCode: postCode !== "",
    city: city !== "",
  });

  const isDataCorrect = <T extends {}>(result: ValidationResult<T>): boolean => Object.values(result).every((v) => v);

  useEffect(() => {
    dispatch(setPersonalFormResult(validatePersonalFormKeys()));
  }, [salutation, firstName, lastName, birthName, birthDate, birthCity]);

  useEffect(() => {
    dispatch(setAddressFormResult(validateAddressFormKeys()));
  }, [street, houseNumber, postCode, city]);

  useEffect(() => {
    dispatch(setPersonalFormIsCorrect(isDataCorrect(formPersonalResult)));
  }, [formPersonalResult]);

  useEffect(() => {
    dispatch(setAddressFormIsCorrect(isDataCorrect(formAddressResult)));
  }, [formAddressResult]);

  useEffect(() => {
    dispatch(setPersonalFormStatus(setPersonalFormKeysStatuses()));
  }, [formPersonalResult, formPersonalTouched, isFormPersonalDirty]);

  useEffect(() => {
    dispatch(setAddressFormStatus(setAddressFormKeysStatuses()));
  }, [formAddressResult, formAddressTouched, isFormAddressDirty]);
};

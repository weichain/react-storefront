import { CountryCode } from "@/checkout-storefront/graphql";
import { AddressField, AddressFormData } from "@/checkout-storefront/components/AddressForm/types";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { difference } from "lodash-es";
import { TextInput } from "@/checkout-storefront/components/TextInput";
import { autocompleteTags, typeTags } from "@/checkout-storefront/lib/consts/inputAttributes";
import { CountrySelect } from "@/checkout-storefront/components/CountrySelect";
import { Select } from "@/checkout-storefront/components/Select";
import {
  getEmptyAddressFormData,
  isMatchingAddressFormData,
} from "@/checkout-storefront/components/AddressForm/utils";
import { BlurHandler, ChangeHandler, useFormContext } from "@/checkout-storefront/hooks/useForm";
import { useAddressFormUtils } from "@/checkout-storefront/components/AddressForm/useAddressFormUtils";
import { usePhoneNumberValidator } from "@/checkout-storefront/lib/utils/phoneNumber";
import { FieldValidator } from "formik";
import { getUserInputs } from "../CardPayment";

export interface AddressFormProps {
  content?: string | undefined;
  title: string;
  availableCountries?: CountryCode[];
  fieldProps?: {
    onBlur?: BlurHandler;
    onChange?: ChangeHandler;
  };
}

interface IFieldValues {
  firstName: string;
  phone: string | undefined;
}

export const fieldValues: IFieldValues = {
  firstName: "",
  phone: undefined,
};

export const AddressForm: FC<PropsWithChildren<AddressFormProps>> = ({
  content,
  children,
  availableCountries,
  fieldProps = {},
}) => {
  const { values, setValues, dirty } = useFormContext<AddressFormData>();
  const isValidPhoneNumber = usePhoneNumberValidator(values.countryCode);
  const previousValues = useRef(values);

  const {
    orderedAddressFields,
    getFieldLabel,
    isRequiredField,
    countryAreaChoices,
    allowedFields,
  } = useAddressFormUtils(values.countryCode);

  const allowedFieldsRef = useRef(allowedFields || []);

  const customValidators: Partial<Record<AddressField, FieldValidator>> = {
    phone: isValidPhoneNumber,
  };

  // prevents outdated data to remain in the form when a field is
  // no longer allowed
  useEffect(() => {
    const hasFormDataChanged = !isMatchingAddressFormData(values, previousValues.current);

    if (!hasFormDataChanged) {
      return;
    }
    previousValues.current = values;

    const removedFields = difference(allowedFieldsRef.current, allowedFields);

    if (removedFields.length && dirty) {
      const emptyAddressFormData = getEmptyAddressFormData();

      void setValues(
        removedFields.reduce(
          (result, field) => ({
            ...result,
            [field]: emptyAddressFormData[field],
          }),
          values
        ),
        true
      );
    }
  }, [allowedFields, dirty, setValues, values]);

  fieldValues.firstName = values.firstName;
  fieldValues.phone = isValidPhoneNumber(values.phone);
  getUserInputs(values.firstName, isValidPhoneNumber(values.phone));

  return (
    <>
      {content && (
        <div className="mb-3 flex flex-col">
          <p className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">country</p>
          <CountrySelect only={availableCountries} />
        </div>
      )}
      {!content && (
        <div className="mt-2">
          {orderedAddressFields.map((field) => {
            const isRequired = isRequiredField(field);
            const label = getFieldLabel(field);
            const commonProps = {
              key: field,
              name: field,
              label: label,
              autoComplete: autocompleteTags[field],
              optional: isRequired ? undefined : true,
              validate: customValidators[field],
              ...fieldProps,
            };

            if (field === "countryArea" && isRequired) {
              return (
                <Select
                  {...commonProps}
                  classNames={{ container: "mb-4" }}
                  placeholder={getFieldLabel("countryArea")}
                  options={
                    countryAreaChoices?.map(({ verbose, raw }) => ({
                      label: verbose as string,
                      value: raw as string,
                    })) || []
                  }
                />
              );
            }
            return <TextInput {...commonProps} type={typeTags[field] || "text"} />;
          })}
          {children}
        </div>
      )}
    </>
  );
};

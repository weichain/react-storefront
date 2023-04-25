import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { PasswordInput } from "@/checkout-storefront/components/PasswordInput";
import { SignInFormContainer, SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { Checkbox } from "@/checkout-storefront/components/Checkbox";
import { contactMessages } from "../Contact/messages";
import { useGuestUserForm } from "@/checkout-storefront/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout-storefront/providers/FormProvider";

type GuestUserProps = Pick<SignInFormContainerProps, "onSectionChange"> & {
  onEmailChange: (email: string) => void;
  email: string;
  fullName: string;
  onFullNameChange: (fullName: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (phoneNumber: string) => void;
};

export const GuestUser: React.FC<GuestUserProps> = ({
  onSectionChange,
  onEmailChange,
  email: initialEmail,
  onFullNameChange,
  fullName,
  onPhoneNumberChange,
  phoneNumber,
}) => {
  const formatMessage = useFormattedMessages();
  const form = useGuestUserForm({ initialEmail, fullName, phoneNumber });
  const { handleChange } = form;
  const { createAccount } = form.values;

  return (
    <SignInFormContainer
      title={formatMessage(contactMessages.contact)}
      redirectSubtitle={formatMessage(contactMessages.haveAccount)}
      redirectButtonLabel={formatMessage(contactMessages.signIn)}
      onSectionChange={onSectionChange}
    >
      <FormProvider form={form}>
        <div className="flex flex-col">
          <div className="flex">
            <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
              {formatMessage(contactMessages.fullName)}
            </label>
            <img src="/redStar.svg" alt="logo" className="mb-1" />
          </div>
          <input
            name="fullname"
            className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
            onChange={(event) => {
              handleChange(event);
              onFullNameChange(event.target.value);
            }}
            value={fullName}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
              {formatMessage(contactMessages.email)}
            </label>
            <img src="/redStar.svg" alt="logo" className="mb-1" />
          </div>
          <input
            name="email"
            className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
            onChange={(event) => {
              handleChange(event);
              onEmailChange(event.target.value);
            }}
            value={initialEmail}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
              {formatMessage(contactMessages.telephoneNumber)}
            </label>
            <img src="/redStar.svg" alt="logo" className="mb-1" />
          </div>
          <input
            name="telephoneNumber"
            className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
            onChange={(event) => {
              handleChange(event);
              onPhoneNumberChange(event.target.value);
            }}
            value={phoneNumber}
          />
        </div>
        <Checkbox
          name="createAccount"
          label={formatMessage(contactMessages.wantToCreateAccount)}
          data-testid={"createAccountCheckbox"}
          classNames={{ container: "!mb-0" }}
        />
        {createAccount && (
          <div className="mt-2">
            <PasswordInput
              name="password"
              label={formatMessage(contactMessages.passwordWithRequirements)}
            />
            <PasswordInput
              name="repatPassword"
              label={formatMessage(contactMessages.repeatPassword)}
            />
          </div>
        )}
      </FormProvider>
    </SignInFormContainer>
  );
};

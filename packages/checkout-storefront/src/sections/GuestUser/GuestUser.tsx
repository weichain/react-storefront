import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { PasswordInput } from "@/checkout-storefront/components/PasswordInput";
import { SignInFormContainer, SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { Checkbox } from "@/checkout-storefront/components/Checkbox";
import { TextInput } from "@/checkout-storefront/components/TextInput";
import { contactMessages } from "../Contact/messages";
import { useGuestUserForm } from "@/checkout-storefront/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout-storefront/providers/FormProvider";
import { UserShippingAddressSection } from "@/checkout-storefront/sections/UserShippingAddressSection";
//import { GuestShippingAddressSection } from "@/checkout-storefront/sections/GuestShippingAddressSection";
import { GuestBillingAddressSection } from "@/checkout-storefront/sections/GuestBillingAddressSection";
import { useUser } from "@/checkout-storefront/hooks/useUser";
import { UserBillingAddressSection } from "../UserBillingAddressSection";

type GuestUserProps = Pick<SignInFormContainerProps, "onSectionChange"> & {
  onEmailChange: (email: string) => void;
  email: string;
};

export const GuestUser: React.FC<GuestUserProps> = ({
  onSectionChange,
  onEmailChange,
  email: initialEmail,
}) => {
  const formatMessage = useFormattedMessages();
  const form = useGuestUserForm({ initialEmail });
  const { handleChange } = form;
  const { createAccount } = form.values;
  const { user } = useUser();

  return (
    <SignInFormContainer
      title={formatMessage(contactMessages.contact)}
      redirectSubtitle={formatMessage(contactMessages.haveAccount)}
      redirectButtonLabel={formatMessage(contactMessages.signIn)}
      onSectionChange={onSectionChange}
    >
      <FormProvider form={form}>
        <TextInput
          name="email"
          label={formatMessage(contactMessages.email)}
          onChange={(event) => {
            handleChange(event);
            onEmailChange(event.target.value);
          }}
        />
        <div className="section" data-testid="shippingAddressSection">
          {/* {user ? <UserShippingAddressSection /> : <GuestShippingAddressSection />} */}
          {user ? <UserBillingAddressSection /> : <GuestBillingAddressSection />}
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
            />{" "}
            <PasswordInput
              name="repeatPassword"
              label={formatMessage(contactMessages.repeatPassword)}
            />
          </div>
        )}
      </FormProvider>
    </SignInFormContainer>
  );
};

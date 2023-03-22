import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { SignInFormContainerProps } from "../Contact/SignInFormContainer";
import { TextInput } from "@/checkout-storefront/components/TextInput";
import { contactMessages } from "../Contact/messages";
import { useGuestUserForm } from "@/checkout-storefront/sections/GuestUser/useGuestUserForm";
import { FormProvider } from "@/checkout-storefront/providers/FormProvider";

type GuestUserProps = Pick<SignInFormContainerProps, "onSectionChange"> & {
  onEmailChange: (email: string) => void;
  email: string;
};

export const GuestUser: React.FC<GuestUserProps> = ({ onEmailChange, email: initialEmail }) => {
  const formatMessage = useFormattedMessages();
  const form = useGuestUserForm({ initialEmail });
  const { handleChange } = form;

  return (
    <FormProvider form={form}>
      <TextInput
        name="email"
        label={formatMessage(contactMessages.email)}
        onChange={(event) => {
          handleChange(event);
          onEmailChange(event.target.value);
        }}
      />
    </FormProvider>
  );
};

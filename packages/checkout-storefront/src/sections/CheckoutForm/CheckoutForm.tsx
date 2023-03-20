import { Contact } from "@/checkout-storefront/sections/Contact";
import { DeliveryMethods } from "@/checkout-storefront/sections/DeliveryMethods";
import { Suspense, useState } from "react";
import { Button } from "@/checkout-storefront/components/Button";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { ContactSkeleton } from "@/checkout-storefront/sections/Contact/ContactSkeleton";
import { DeliveryMethodsSkeleton } from "@/checkout-storefront/sections/DeliveryMethods/DeliveryMethodsSkeleton";
import { useCheckoutSubmit } from "@/checkout-storefront/sections/CheckoutForm/useCheckoutSubmit";
import { commonMessages } from "@/checkout-storefront/lib/commonMessages";
import { checkoutFormLabels, checkoutFormMessages } from "./messages";
import { getQueryParams } from "@/checkout-storefront/lib/utils/url";
import { CollapseSection } from "@/checkout-storefront/sections/CheckoutForm/CollapseSection";
import { Divider } from "@/checkout-storefront/components";

import { UserBillingAddressSection } from "@/checkout-storefront/sections/UserBillingAddressSection";
import { PaymentSection } from "@/checkout-storefront/sections/PaymentSection";
import { GuestBillingAddressSection } from "@/checkout-storefront/sections/GuestBillingAddressSection";
import { useFetchPaymentMethods } from "@/checkout-storefront/hooks/useFetchPaymentMethods";
import { useUser } from "@/checkout-storefront/hooks/useUser";
import { PageHeader } from "../PageHeader";
import { Footer } from "@/checkout-storefront/components/Footer/Footer";

export const CheckoutForm = () => {
  const formatMessage = useFormattedMessages();
  const { user } = useUser();
  const { passwordResetToken } = getQueryParams();

  const [showOnlyContact, setShowOnlyContact] = useState(!!passwordResetToken);

  const { handleSubmit, isProcessing } = useCheckoutSubmit();

  const { availablePaymentProviders } = useFetchPaymentMethods();

  const shouldShowPayButton = availablePaymentProviders.some(
    (provider) => provider && provider !== "adyen"
  );

  return (
    <div className="checkout-form-container">
      <PageHeader />
      <div className="checkout-form">
        <Suspense fallback={<ContactSkeleton />}>
          <Contact setShowOnlyContact={setShowOnlyContact} />
        </Suspense>
        <>
          <Suspense fallback={<DeliveryMethodsSkeleton />}>
            <Divider />
            <DeliveryMethods collapsed={showOnlyContact} />
          </Suspense>
          <CollapseSection collapse={showOnlyContact}>
            <PaymentSection>
              {user ? <UserBillingAddressSection /> : <GuestBillingAddressSection />}
            </PaymentSection>
          </CollapseSection>
          <Divider />
          <Footer />
        </>
      </div>
      {shouldShowPayButton &&
        !showOnlyContact &&
        (isProcessing ? (
          <Button
            className="pay-button"
            disabled
            ariaLabel={formatMessage(checkoutFormLabels.pay)}
            label={formatMessage(commonMessages.processing)}
          />
        ) : (
          <Button
            ariaLabel={formatMessage(checkoutFormLabels.pay)}
            label={formatMessage(checkoutFormMessages.pay)}
            className="pay-button"
            onClick={handleSubmit}
            data-testid="pay-button"
          />
        ))}
    </div>
  );
};

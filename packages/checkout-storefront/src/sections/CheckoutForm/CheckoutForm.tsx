import { useCheckout } from "@/checkout-storefront/hooks/useCheckout";
import { Contact } from "@/checkout-storefront/sections/Contact";
import { Suspense, useState } from "react";
import { Button } from "@/checkout-storefront/components/Button";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { ContactSkeleton } from "@/checkout-storefront/sections/Contact/ContactSkeleton";
import { AddressSectionSkeleton } from "@/checkout-storefront/components/AddressSectionSkeleton";
import { useCheckoutSubmit } from "@/checkout-storefront/sections/CheckoutForm/useCheckoutSubmit";
import { commonMessages } from "@/checkout-storefront/lib/commonMessages";
import { checkoutFormLabels, checkoutFormMessages } from "./messages";
import { getQueryParams } from "@/checkout-storefront/lib/utils/url";
import { CollapseSection } from "@/checkout-storefront/sections/CheckoutForm/CollapseSection";
import { Divider } from "@/checkout-storefront/components";
import { UserShippingAddressSection } from "@/checkout-storefront/sections/UserShippingAddressSection";
import { GuestShippingAddressSection } from "@/checkout-storefront/sections/GuestShippingAddressSection";

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
  const { checkout } = useCheckout();
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
          {/* {checkout?.isShippingRequired && (
            <Suspense fallback={<AddressSectionSkeleton />}>
              <CollapseSection collapse={showOnlyContact}>
                <div className="section" data-testid="shippingAddressSection">
                  {user ? <UserShippingAddressSection /> : <GuestShippingAddressSection />}
                </div>
              </CollapseSection>
            </Suspense>
          )} */}
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

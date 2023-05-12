import React, { PropsWithChildren } from "react";
import { Text } from "@saleor/ui-kit";
export interface SignInFormContainerProps {
  title: string;
  redirectSubtitle?: string;
  redirectButtonLabel?: string;
  subtitle?: string;
  onSectionChange: () => void;
}

export const SignInFormContainer: React.FC<PropsWithChildren<SignInFormContainerProps>> = ({
  title,
  redirectButtonLabel,
  redirectSubtitle,
  subtitle,
  onSectionChange,
  children,
}) => {
  return (
    <div className="section">
      <div className="flex flex-col mb-2">
        <div className="flex flex-row justify-between items-baseline">
          <p className="font-bold text-[#1E1E1E] text-[20px]">{title}</p>
          <div className="flex flex-row">
            {redirectSubtitle && (
              <p className="mr-2 text-[#8F8F8F] text-[14px]">{redirectSubtitle}</p>
            )}
            {redirectButtonLabel && (
              <p
                className="underline text-[#1E1E1E] text-[14px] cursor-pointer"
                onClick={onSectionChange}
              >
                {redirectButtonLabel}
              </p>
            )}
          </div>
        </div>
        {subtitle && (
          <Text color="secondary" className="mt-3">
            {subtitle}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
};

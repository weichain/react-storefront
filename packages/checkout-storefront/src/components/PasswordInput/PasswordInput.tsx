import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { EyeHiddenIcon, EyeIcon } from "@/checkout-storefront/icons";
import { IconButton } from "@/checkout-storefront/components/IconButton";
import { TextInputProps } from "@/checkout-storefront/components/TextInput";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { labels } from "@/checkout-storefront/components/PasswordInput/messages";
import { useState } from "react";

export const PasswordInput = <TName extends string>(props: TextInputProps<TName>) => {
  const formatMessage = useFormattedMessages();
  const [passwordVisible, setPasswordVisible] = useState(false);
  console.log(props);
  return (
    <div className="relative">
      <div className="flex flex-col">
        <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
          {props.label}
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
        />
      </div>
      <div className="password-input-icon">
        <IconButton
          variant="bare"
          ariaLabel={formatMessage(labels.passwordVisibility)}
          onClick={() => setPasswordVisible(!passwordVisible)}
          icon={
            <img src={passwordVisible ? getSvgSrc(EyeIcon) : getSvgSrc(EyeHiddenIcon)} alt="" />
          }
        />
      </div>
    </div>
  );
};

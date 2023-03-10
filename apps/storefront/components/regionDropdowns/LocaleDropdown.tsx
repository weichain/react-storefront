import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

import { LOCALES } from "@/lib/regions";
import { HorizontalAlignment } from "@saleor/ui-kit";

import { useRegions } from "../RegionsProvider";
import divider from "../../public/Divider.jpg";

interface DropdownOption {
  label: string;
  chosen: boolean;
  localeSlug: string;
}

export interface LocaleDropdownProps {
  horizontalAlignment?: HorizontalAlignment;
}

export function LocaleDropdown() {
  const router = useRouter();
  const { currentLocale, currentChannel } = useRegions();

  const localeOptions: DropdownOption[] = LOCALES.map((loc) => ({
    label: loc.name,
    chosen: loc.slug === currentLocale,
    localeSlug: loc.slug,
  })).reverse();

  const onLocaleChange = (localeSlug: string) => {
    if (localeSlug === currentLocale) {
      return;
    }

    // Update current URL to use the chosen locale
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        channel: currentChannel.slug,
        locale: localeSlug,
      },
    });
  };

  return (
    <div className="flex justify-between items-center w-14 relative sm: mr-4">
      {localeOptions.map((option) => (
        <p
          className="cursor-pointer"
          key={option.label}
          onClick={() => onLocaleChange(option.localeSlug)}
        >
          {option.localeSlug}
        </p>
      ))}
      <Image src={divider} alt="divider" className="absolute right-7" />
    </div>
  );
}

export default LocaleDropdown;

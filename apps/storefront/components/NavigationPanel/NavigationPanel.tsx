import Link from "next/link";
import React from "react";
import { useIntl } from "react-intl";

import { usePaths } from "../../lib/paths";
import { messages } from "../translations";
import useLogout from "@/lib/hooks/useLogout";

export function NavigationPanel() {
  const paths = usePaths();
  const t = useIntl();
  const onLogout = useLogout();

  const linkClassname =
    "flex p-4 items-center w-full rounded-md shadow-sm h-10 hover:text-blue-500";
  return (
    <div className="group w-full md:w-4/5 cursor-default rounded-md bg-white">
      <Link href={paths.account.addressBook.$url()} passHref legacyBehavior>
        <a href="pass" className="text-black">
          {/* <span className={linkClassname}>{t.formatMessage(messages.menuAccountAddressBook)}</span> */}
          <span className={linkClassname}>{t.formatMessage(messages.menuAccountDetails)}</span>
        </a>
      </Link>
      <Link href={paths.account.orders.$url()} passHref legacyBehavior>
        <a href="pass" className="text-black">
          <span className={linkClassname}>{t.formatMessage(messages.menuAccountOrders)}</span>
        </a>
      </Link>
      <button className={linkClassname} type="button" onClick={onLogout}>
        {t.formatMessage(messages.logOut)}
      </button>
      {/* <Link href={paths.account.preferences.$url()} passHref legacyBehavior>
        <a href="pass" className="text-black">
          <span className={linkClassname}>{t.formatMessage(messages.menuAccountPreferences)}</span>
        </a>
      </Link> */}
    </div>
  );
}

export default NavigationPanel;

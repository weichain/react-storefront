import Link from "next/link";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { usePaths } from "../../lib/paths";
import { messages } from "../translations";
import useLogout from "@/lib/hooks/useLogout";

export function NavigationPanel() {
  const paths = usePaths();
  const t = useIntl();
  const onLogout = useLogout();
  const [backgroundColor, setBackgroundColor] = useState(true);

  const linkClassname = "flex p-4 items-center w-full rounded-md h-10 hover:text-blue-500";
  const activeLink = "bg-[#F3E4C8]";
  return (
    <div className="group w-full cursor-default rounded-md bg-white text-[16px]">
      <Link href={paths.account.addressBook.$url()} passHref legacyBehavior>
        <a href="pass" className="text-black">
          {/* <span className={linkClassname}>{t.formatMessage(messages.menuAccountAddressBook)}</span> */}
          <span
            onClick={() => setBackgroundColor(true)}
            className={backgroundColor ? linkClassname + " " + activeLink : linkClassname}
          >
            {t.formatMessage(messages.menuAccountDetails)}
          </span>
        </a>
      </Link>
      <Link href={paths.account.orders.$url()} passHref legacyBehavior>
        <a href="pass" className="text-black">
          <span
            onClick={() => setBackgroundColor(false)}
            className={!backgroundColor ? linkClassname + " " + activeLink : linkClassname}
          >
            {t.formatMessage(messages.menuAccountOrders)}
          </span>
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

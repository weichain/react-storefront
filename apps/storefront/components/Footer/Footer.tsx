import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { getLinkPath } from "@/lib/menus";
import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";

import { LocaleDropdown } from "../regionDropdowns/LocaleDropdown";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";

export type FooterProps = HTMLAttributes<HTMLElement>;

// Saleor Cloud currently doesn't support relative URLs in the footer.
// This is a workaround to make the links work.
// @todo remove this when the issue is fixed.
const fixMenuItemLocalhostUrl = (url: string) => url.replace(/^https?:\/\/localhost:8000\//, "/");

export function Footer() {
  const paths = usePaths();
  const { query, currentChannel, currentLocale } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });

  if (error) {
    console.error("Footer component error", error.message);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-inner"]}>
        <div className="flex mb-0 sm:mb-14 sm:items-start items-baseline">
          <div>
            <Link href={paths.$url()} passHref legacyBehavior>
              <a href="pass" className="hidden sm:inline-block">
                <div className="mt-px group block h-16 w-28 relative">
                  <Image src="/Veranda.png" alt="Saleor logo" width={150} height={150} />
                </div>
              </a>
            </Link>
            <div className="flex items-center w-64 m-15px auto my-4 sm: w-80">
              <Image
                src="/Envelope.png"
                alt="email"
                width={15}
                height={15}
                className={styles.contactsImg}
              />
              <p className="ml-2.5">EMAIL@VERANDARESORT.COM</p>
            </div>
            <div className="flex items-center w-64 m-15px auto my-4 sm: w-80">
              <Image
                src="/phone.png"
                alt="phone"
                width={15}
                height={15}
                className={styles.contactsImg}
              />
              <p className="ml-2.5">+66-1234-1234</p>
            </div>
          </div>
          <div className="grid sm:gap-[5rem] gap-[0] text-end w-full sm:w-auto sm:flex sm:flex-wrap sm:justify-start sm:ml-auto sm:mr-24 sm:mt-20">
            {data?.menu?.items?.map((item) => (
              <div className="sm:ml-14" key={item?.id}>
                {item?.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["menu-heading"]}
                  >
                    {item?.name}
                  </a>
                ) : (
                  <Link
                    href={getLinkPath(item, currentChannel.slug, currentLocale)}
                    passHref
                    legacyBehavior
                  >
                    <a href="pass" className={styles["menu-heading"]}>
                      {item?.name}
                    </a>
                  </Link>
                )}
                <ul className={styles.menu}>
                  {item?.children?.map((sub) => (
                    <li key={sub?.id}>
                      {sub?.url ? (
                        <a
                          href={fixMenuItemLocalhostUrl(sub.url)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles["menu-link"]}
                          data-testid={`footerExternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </a>
                      ) : (
                        <Link
                          href={getLinkPath(sub, currentChannel.slug, currentLocale)}
                          passHref
                          legacyBehavior
                        >
                          <a
                            href="pass"
                            className={styles["menu-link"]}
                            data-testid={`footerInternalLinks${sub?.name}`}
                          >
                            {sub?.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm w-7/12">
            COPYRIGHT © {new Date().getFullYear()} VERANDA ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            <LocaleDropdown />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

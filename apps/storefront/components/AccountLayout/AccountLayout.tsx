//import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { Layout, Spinner } from "@/components";
import { NavigationPanel } from "@/components/NavigationPanel";
//import { usePaths } from "@/lib/paths";
import { useUser } from "@/lib/useUser";
import { useSaleorAuthContext } from "@/lib/auth";

export type AccountLayoutProps = { children: ReactNode };

export function AccountLayout({ children }: AccountLayoutProps) {
  const { authenticated } = useUser();
  const { isAuthenticating } = useSaleorAuthContext();
  // const router = useRouter();
  // const paths = usePaths();

  // if (isAuthenticating) {
  //   return (
  //     <Layout>
  //       <Spinner />
  //     </Layout>
  //   );
  // }

  // if (!authenticated && typeof window !== "undefined") {
  //   void router.push(paths.account.login.$url({ query: { next: router?.pathname } }));
  //   return null;
  // }

  return (
    <Layout>
      {authenticated && (
        <div className="py-10">
          <main className="flex flex-col md:flex-row container px-8">
            <div className="mb-2 flex-initial md:w-3/5">
              <div className="flex flex-row items-start py-0 gap-10">
                <span className="p-4 font-poppins font-semibold text-[24px] leading-125 tracking-tighter text-gray-900">
                  My Account
                </span>
              </div>
              <NavigationPanel />
            </div>
            <div className="flex flex-initial w-full flex-col overflow-y-auto md:px-4 space-y-4">
              {children}
            </div>
          </main>
        </div>
      )}
      {isAuthenticating && <Spinner />}
      {!isAuthenticating && !authenticated && <div className="min-h-[500px] bg-white"></div>}
    </Layout>
  );
}

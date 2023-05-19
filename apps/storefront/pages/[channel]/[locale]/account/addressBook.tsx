import React, { ReactElement } from "react";
import { useIntl } from "react-intl";

import { AccountLayout, AddressBookCard, Spinner } from "@/components";
import { messages } from "@/components/translations";
import { useCurrentUserAddressesQuery, useUserQuery } from "@/saleor/api";
import { useUser } from "@/lib/useUser";
import { UserDetailsCard } from "@/components/UserDetailsCard";

function AddressBookPage() {
  const t = useIntl();
  const { authenticated } = useUser();
  const { loading, error, data, refetch } = useCurrentUserAddressesQuery({
    skip: !authenticated,
    fetchPolicy: "network-only",
  });
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
    refetch: refetchuser,
  } = useUserQuery();

  if (loading || loadingUser) {
    return <Spinner />;
  }
  if (error || errorUser) {
    return <p>Error :{error?.message || errorUser?.message}</p>;
  }

  const addresses = data?.me?.addresses || [];
  if (addresses.length === 0 && !dataUser?.user?.email) {
    return <div>{t.formatMessage(messages.noAddressDataMessage)}</div>;
  }

  return (
    <>
      <div className="flex flex-row items-start p-0 gap-10">
        <span className="font-poppins font-[600] text-[24px] leading-125 tracking-tighter text-gray-800 pt-4">
          Details
        </span>
      </div>
      <div className="grid grid-cols-1">
        {[addresses[0]].map((address) => (
          // <AddressBookCard key={address.id} address={address} onRefreshBook={() => refetch()} />
          <UserDetailsCard
            key={address?.id}
            address={address}
            email={dataUser?.user?.email || ""}
            onRefreshBook={() => refetch()}
          />
        ))}
      </div>
    </>
  );
}

export default AddressBookPage;

AddressBookPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

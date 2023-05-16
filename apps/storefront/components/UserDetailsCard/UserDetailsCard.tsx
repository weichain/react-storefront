import { useIntl } from "react-intl";

import UserDetails from "../checkout/UserDetails";
import { AddressDetailsFragment } from "@/saleor/api";

export interface AddressBookCardProps {
  address: AddressDetailsFragment;
  email: string;
  onRefreshBook: () => void;
}

export function UserDetailsCard({ address, email, onRefreshBook }: AddressBookCardProps) {
  const t = useIntl();

  return (
    <div className="flex flex-col items-start p-0">
      <UserDetails address={address} email={email} />
    </div>
  );
}

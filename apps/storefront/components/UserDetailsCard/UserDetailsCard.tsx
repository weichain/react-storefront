import { useIntl } from "react-intl";

import UserDetails from "../checkout/UserDetails";
import { AddressDetailsFragment } from "@/saleor/api";

export interface AddressBookCardProps {
  user: any;
  onRefreshBook: () => void;
}

export function UserDetailsCard({ user, onRefreshBook }: AddressBookCardProps) {
  const t = useIntl();

  return (
    <div className="flex flex-col items-start p-0">
      <UserDetails user={user} />
    </div>
  );
}

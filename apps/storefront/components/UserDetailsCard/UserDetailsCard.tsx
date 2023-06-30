import UserDetails from "../checkout/UserDetails";

export interface AddressBookCardProps {
  user: any;
  onRefreshBook?: () => void;
}

export function UserDetailsCard({ user }: AddressBookCardProps) {
  return (
    <div className="flex flex-col items-start p-0">
      <UserDetails user={user} />
    </div>
  );
}

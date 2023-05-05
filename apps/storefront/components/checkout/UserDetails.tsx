import usePaths from "@/lib/paths";
import { AddressDetailsFragment } from "@/saleor/api";
import Link from "next/link";

export interface addressDisplayProps {
  address: AddressDetailsFragment;
  email: string;
}

interface UserInfoLabelProps {
  label: string;
  text: string;
}

function UserInfoLabel({ label, text }: UserInfoLabelProps) {
  return (
    <div className="flex flex-col items-start p-0 gap-1">
      <span className="font-poppins font-semibold text-xs leading-150 tracking-wider uppercase text-gray-500">
        {label}
      </span>
      <span className="font-poppins font-normal text-sm leading-150 flex items-center tracking-tighter text-gray-800">
        {text}
      </span>
    </div>
  );
}

function Spacer() {
  return (
    <div
      className="flex flex-col items-start p-0 gap-10 bg-gray-300 w-full"
      style={{ height: "1px" }}
    ></div>
  );
}

function Title({ title }: { title: string }) {
  const paths = usePaths();
  return (
    <div className="flex flex-row justify-between items-start w-full p-0 gap-10">
      <span className="font-poppins font-normal text-lg leading-125 tracking-tighter text-gray-800">
        {title}
      </span>
      <div className="flex flex-row justify-end items-center p-0 gap-4">
        <span className="flex flex-row items-center p-0 gap-2">
          <Link href={paths.account.preferences.$url()} passHref legacyBehavior>
            <a className="flex font-poppins font-normal text-sm leading-150 tracking-tighter underline text-gray-800 h-full">
              Edit
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export function UserDetails({ address, email }: addressDisplayProps) {
  const fullName =
    address?.firstName && address?.lastName
      ? `${address?.firstName} ${address?.lastName}`
      : address?.firstName
      ? address?.firstName
      : address?.lastName
      ? address?.lastName
      : "Unknown Name";
  return (
    <>
      <Title title="Your Details" />
      <div className="h-8"></div>
      <UserInfoLabel label={"fullname"} text={fullName} />
      <div className="h-4"></div>
      <UserInfoLabel label={"email"} text={email} />
      <div className="h-4"></div>
      <UserInfoLabel label={"phone number"} text={address?.phone || "Unknown Phone"} />
      <div className="h-8"></div>
      <Spacer />
      <div className="h-8"></div>
      <Title title="Password" />
      <div className="h-8"></div>
      <span className="font-sans font-normal text-base leading-6 tracking-wider text-gray-500">
        Update your password
      </span>
      <div className="h-8"></div>
      <Spacer />
    </>
  );
}

export default UserDetails;

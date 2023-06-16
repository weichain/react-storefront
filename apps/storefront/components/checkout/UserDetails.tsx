import usePaths from "@/lib/paths";
import { AddressDetailsFragment } from "@/saleor/api";
import Link from "next/link";

export interface addressDisplayProps {
  user: any;
}

interface UserInfoLabelProps {
  label: string;
  text: string;
}

function UserInfoLabel({ label, text }: UserInfoLabelProps) {
  return (
    <div className="flex flex-col items-start p-0 gap-1">
      <span className="font-poppins font-[600] text-[12px] leading-150 tracking-[2px] uppercase text-secondary">
        {label}
      </span>
      <span className="font-poppins font-normal text-[14px] leading-150 flex items-center tracking-tighter text-black">
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
      <span className="font-poppins font-normal text-[24px] font-[600] leading-125 tracking-tighter text-gray-800">
        {title}
      </span>
      <div className="flex flex-row justify-end items-center p-0 gap-4">
        <span className="flex flex-row items-center p-0 gap-2">
          <Link href={paths.account.preferences.$url()} passHref legacyBehavior>
            <a className="flex font-poppins font-normal text-[14px] leading-150 tracking-tighter underline text-gray-800 h-full">
              Edit
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export function UserDetails({ user }: addressDisplayProps) {
  return (
    <>
      <Title title="Your Details" />
      <div className="h-8"></div>
      <UserInfoLabel label={"full name"} text={user.firstName + " " + user.lastName} />
      <div className="h-4"></div>
      <UserInfoLabel label={"email"} text={user.email} />
      <div className="h-4"></div>
      <UserInfoLabel label={"phone number"} text={user.phone || "Unknown Phone"} />
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

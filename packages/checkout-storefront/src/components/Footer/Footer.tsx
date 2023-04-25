import React from "react";

export const Footer = () => {
  return (
    <div className="pb-20 flex flex-col gap-6">
      <p className="text-[#1E1E1E] text-[16px] font-bold">Heed Help?</p>
      <div className="flex items-center w-11/12">
        <img src="/EnvelopeBlack.png" alt="email" width={15} height={15} />
        <p className="mt-auto mr-1 mb-auto ml-3">[Email]</p>
        <img src="/ArrowUpRight.png" alt="logo" width={9} height={5} />
      </div>
      <div className="flex items-center">
        <img src="/PhoneBlack.png" alt="phone" width={15} height={15} />
        <p className="ml-2">+66 (0)1234 1234</p>
      </div>
    </div>
  );
};

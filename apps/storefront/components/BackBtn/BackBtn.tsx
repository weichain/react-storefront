import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const BackBtn = () => {
  const router = useRouter();

  return (
    <div className="my-8 mx-auto w-11/12">
      <div className="objectFit flex items-center cursor-pointer" onClick={() => router.back()}>
        <Image src="/left.svg" alt="back" width={20} height={20} />
        <p className="text-[16px] underline">Back</p>
      </div>
    </div>
  );
};

export default BackBtn;

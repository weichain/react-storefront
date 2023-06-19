/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

import usePaths from "@/lib/paths";
import { useSaleorAuthContext } from "@/lib/auth";

function PasswordReset() {
  const [userPassword, setUserPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const { resetPassword } = useSaleorAuthContext();
  const router = useRouter();
  const paths = usePaths();

  const resetPasswordHandler = async () => {
    setPasswordError("");

    const result = await resetPassword({
      email: router.query.email as string,
      password: userPassword,
      token: router.query.token as string,
    });

    if (result.data.setPassword.errors.length) {
      setPasswordError(result.data.setPassword.errors[0].message as string);
    }

    if (result.data.setPassword.refreshToken) {
      setSuccessMessage(true);

      setTimeout(() => {
        void router.push(paths.$url());
      }, 4000);
    }
  };

  return (
    <div className="w-11/12 lg:w-4/12 m-auto mt-40">
      <div className="flex justify-between">
        <h2 className="font-bold text-[#1E1E1E] text-[20px]">Reset password</h2>
        <div className="flex items-center">
          <p className="mr-2 text-[#8F8F8F] text-[14px]">Remembered your password?</p>
          <p
            className="underline text-[#1E1E1E] text-[14px] cursor-pointer"
            onClick={() => router.push(paths.account.login.$url())}
          >
            Sign in
          </p>
        </div>
      </div>
      <p className="my-3 text-[#8F8F8F] text-[14px]">Provide a new password for your account</p>
      <div className="flex flex-col relative">
        <img
          alt="show"
          src={displayPassword ? "/eyeHidden.svg" : "/eye.svg"}
          width="30px"
          className="absolute right-[20px] top-[25px] cursor-pointer"
          onClick={() => setDisplayPassword((prevState) => !prevState)}
        />
        <label className="text-[#4C4C4C] text-[12px] font-bold uppercase tracking-[.20em]">
          PASSWORD
        </label>
        <input
          onChange={(event) => setUserPassword(event.target.value)}
          type={displayPassword ? "text" : "password"}
          className="min-w-8 h-3 mb-2 max-w-full border border-[#CBCBCB] pt-6 pb-4 px-4 outline-none"
        />
        {passwordError && <p className="text-[14px] text-red-500 text-center">{passwordError}</p>}
        {successMessage ? (
          <p className="text-[14px] text-green-500 text-center">
            Password has been successfully reset
          </p>
        ) : (
          <button
            className="ml-auto mt-4 bg-[#394052] h-10 w-52 text-white rounded text-[14px] hover:bg-white hover:text-[#394052] border border-[#394052]"
            type="button"
            onClick={resetPasswordHandler}
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
}

export default PasswordReset;

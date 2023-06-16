import React, { useState } from "react";
import { useRouter } from "next/router";

import usePaths from "@/lib/paths";
import { useSaleorAuthContext } from "@/lib/auth";

function PasswordReset() {
  const [userPassword, setUserPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
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
    <div className="flex items-center justify-center flex-col mt-[200px] m-auto gap-[30px] w-[80%] lg:w-[50%] border border-slate-700 p-6">
      <label className="text-[20px]">Please enter a new password</label>
      <input
        onChange={(event) => setUserPassword(event.target.value)}
        type="password"
        className="border border-black-500 w-[90%] h-8 outline-none text-[14px] focus:border-black-500"
      />
      {passwordError && <p className="text-[14px] text-red-500 text-center">{passwordError}</p>}
      {successMessage ? (
        <p className="text-[14px] text-green-500 text-center">
          Password has been successfully reset
        </p>
      ) : (
        <button
          className="bg-green-500 text-white px-10 py-2 rounded-md"
          type="button"
          onClick={resetPasswordHandler}
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default PasswordReset;

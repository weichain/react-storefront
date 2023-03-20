import React from "react";

export const Footer = () => {
  return (
    <div className="pb-20 flex flex-col gap-6">
      <p style={{ color: "#1E1E1E", fontSize: "16px", fontWeight: 600 }}>Heed Help?</p>
      <div className="flex items-center" style={{ width: "90px" }}>
        <img src="/EnvelopeBlack.png" alt="email" width={15} height={15} />
        <p style={{ margin: "auto 5px auto 10px" }}>[Email]</p>
        <img src="/ArrowUpRight.png" alt="logo" style={{ width: "12px", height: "10px" }} />
      </div>
      <div className="flex items-center">
        <img src="/PhoneBlack.png" alt="phone" width={15} height={15} />
        <p style={{ marginLeft: "10px" }}>+66 (0)1234 1234</p>
      </div>
    </div>
  );
};

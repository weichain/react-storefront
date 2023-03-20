/* eslint-disable import/no-restricted-paths */
import Image from "next/image";
import Link from "next/link";

export const PageHeader = () => {
  return (
    <div className="page-header">
      <div className="ml-5 flex justify-between" style={{ width: "170px" }}>
        <Link href="#" legacyBehavior>
          <a href="#" style={{ color: "white" }}>
            CHIANG MAI
          </a>
        </Link>
        <Link href="#" legacyBehavior>
          <a href="#" style={{ color: "white" }}>
            SAMUI
          </a>
        </Link>
      </div>
      <Image
        src="/Veranda.png"
        alt="Saleor logo"
        style={{ marginRight: "77px" }}
        width={50}
        height={50}
      />
    </div>
  );
};

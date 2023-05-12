/* eslint-disable import/no-restricted-paths */
import Image from "next/image";

export const PageHeader = () => {
  return (
    <div className="page-header">
      <Image src="/Veranda.png" alt="Saleor logo" width={50} height={50} />
    </div>
  );
};

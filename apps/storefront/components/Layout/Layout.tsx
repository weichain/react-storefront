import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import Image from "next/image";
import veranda from "../../public/veranda.jpg";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Image src={veranda} alt="Veranda" width={1440} height={450} />
      <div className="align-middle flex flex-col flex-grow">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;

import Image from "next/image";
import { useRouter } from "next/router";

import { usePaths } from "@/lib/paths";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const paths = usePaths();
  const currPath = paths.$url().pathname;

  return (
    <>
      <Navbar />
      {router.pathname === currPath && (
        <Image src="/veranda.jpg" alt="Veranda" width={3000} height={450} />
      )}
      <div className="align-middle flex flex-col flex-grow">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;

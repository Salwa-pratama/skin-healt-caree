import { memo } from "react";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { ThemeProvider } from "@/lib/theme-provider";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthListener from "../components/AuthListener";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthListener />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(Layout);

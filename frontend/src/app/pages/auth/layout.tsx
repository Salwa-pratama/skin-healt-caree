// import AuthNavbar from "./Navbar";
import "./auth.css";
import Header from "@/app/components/Header";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <AuthNavbar /> */}
      <Header />
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div >
  );
}

import AuthNavbar from "./Navbar";
import "./auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />
      <div className="flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
}

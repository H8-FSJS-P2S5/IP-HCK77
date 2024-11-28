import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterPage from "../components/Footer";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <FooterPage />
    </div>
  );
}

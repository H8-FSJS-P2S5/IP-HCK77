import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div style={{ background: "#FF7300" }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

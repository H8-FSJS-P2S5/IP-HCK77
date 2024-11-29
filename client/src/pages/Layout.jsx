import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Old_Component/Footer";
import NavigationBar from "../components/New_Navbar";
import FooterPage from "../components/New_Footer";

export default function Layout() {
  return (
    <div>
      {/* <Navbar /> */}
      <NavigationBar />
      <Outlet />
      <FooterPage />
      {/* <Footer /> */}
    </div>
  );
}

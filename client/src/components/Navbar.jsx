import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    >
      <Navbar
        fluid
        rounded
        style={{ background: "#FFD700" }}
        className="rounded-none"
      >
        <Navbar.Brand to="/">
          <img
            className="w-10 h-10 rounded-full self-center"
            src={"../assets/logo.jpg"}
            alt="logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            PlotAlchemy
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/" active>
            Home
          </Link>
          <Link to="/genres">Genres</Link>
          <Link to="/user/my-cauldron">MyCauldron</Link>
          <Link to="/user/profile">Profile</Link>
          <Link to="/login/google">Sign In</Link>
          <a href="#footer">Contact</a>
          <Link to="/logout" className="text-red-700 font-bold">
            Logout
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

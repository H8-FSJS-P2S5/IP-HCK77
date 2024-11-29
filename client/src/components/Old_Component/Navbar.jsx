import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <Navbar
        fluid
        rounded
        style={{ background: "#FFD700" }}
        className="rounded-none"
      >
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              className="w-10 h-10 rounded-full self-center"
              src={"logo.jpg"}
              alt="logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold mx-1 dark:text-white">
              PlotAlchemy
            </span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/" active>
            Home
          </Link>
          <Link to="/genres">Genres</Link>
          <Link to="/user/my-cauldron">MyCauldron</Link>
          <Link to="/user/profile">Profile</Link>
          <a href="#footer">Contact</a>
          {localStorage.getItem("access_token") ? (
            <Link to="/logout" className="text-red-700 font-bold">
              Logout
            </Link>
          ) : (
            <Link to="/login/google" className="text-yellow-500">Sign In</Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

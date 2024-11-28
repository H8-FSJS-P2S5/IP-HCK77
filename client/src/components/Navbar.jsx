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
          <Link to="#footer">Contact</Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand to="https://flowbite-react.com">
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="#" active>
          Home
        </Link>
        <Link to="#">About</Link>
        <Link to="#">Services</Link>
        <Link to="#">Pricing</Link>
        <Link to="#">Contact</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        zIndex: "50",
      }}
    >
      <Navbar
        fluid
        rounded={false}
        style={{
          backgroundColor: "#FFD700", // Golden yellow
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <Link to="/">
          <Navbar.Brand>
            <img
              className="w-10 h-10 rounded-full"
              src={"logo.jpg"}
              alt="logo"
              style={{
                borderRadius: "50%",
                border: "2px solid #FF4500", // Red border for accent
              }}
            />
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#3E2723", // Dark brown
                marginLeft: "0.5rem",
              }}
            >
              PlotAlchemy
            </span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link
            to="/"
            style={{
              color: "#3E2723", // Dark brown
              marginRight: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")} // Red hover
            onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
          >
            Home
          </Link>
          <Link
            to="/genres"
            style={{
              color: "#3E2723",
              marginRight: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
          >
            Genres
          </Link>
          <Link
            to="/user/my-cauldron"
            style={{
              color: "#3E2723",
              marginRight: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
          >
            My Cauldron
          </Link>
          <Link
            to="/user/profile"
            style={{
              color: "#3E2723",
              marginRight: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
          >
            Profile
          </Link>
          <a
            href="#footer"
            style={{
              color: "#3E2723",
              marginRight: "1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
          >
            Contact
          </a>
          {localStorage.getItem("access_token") ? (
            <Link
              to="/logout"
              style={{
                color: "#FF4500",
                fontWeight: "bold",
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login/google"
              style={{
                color: "#3E2723",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
              onMouseLeave={(e) => (e.target.style.color = "#3E2723")}
            >
              Sign In
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

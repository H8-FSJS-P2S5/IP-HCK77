import { Footer } from "flowbite-react";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";

export default function FooterPage() {
  return (
    <Footer
      id="footer"
      className=" rounded-none"
      style={{
        backgroundColor: "#3E2723", // Dark brown background
        padding: "1rem",
        marginTop: "1rem",
        borderTop: "2px solid #FF4500", // Fiery border for accent
      }}
    >
      <div
        className="w-full"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#FFD700", // Golden yellow text
        }}
      >
        <Footer.Copyright
          href="https://github.com/FauzhanWahyudi"
          by="PlotAlchemy"
          year={2024}
          style={{ fontSize: "0.875rem" }}
        />
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <a
            href="#"
            style={{
              color: "#FFD700",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")} // Red hover
            onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
          >
            <CiFacebook size={24} />
          </a>
          <a
            href="#"
            style={{
              color: "#FFD700",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
          >
            <CiInstagram size={24} />
          </a>
          <a
            href="#"
            style={{
              color: "#FFD700",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
          >
            <CiTwitter size={24} />
          </a>
          <a
            href="https://github.com/FauzhanWahyudi"
            style={{
              color: "#FFD700",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#FF4500")}
            onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
          >
            <BsGithub size={24} />
          </a>
        </div>
      </div>
    </Footer>
  );
}

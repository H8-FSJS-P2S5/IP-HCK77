import { Footer } from "flowbite-react";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";
export default function FooterPage() {
  return (
    <Footer
      id="footer"
      container
      className="py-3 px-6 mt-2 rounded-none"
      style={{ background: "#3E2723" }}
    >
      <Footer.Copyright
        href="https://github.com/FauzhanWahyudi"
        by="PlotAlchemy"
        year={2024}
      />
      <div className="flex space-x-6 gap-2 items-center">
        <Footer.Icon href="#" icon={CiFacebook} />
        <Footer.Icon href="#" icon={CiInstagram} />
        <Footer.Icon href="#" icon={CiTwitter} />
        <Footer.Icon href="#" icon={BsGithub} />
      </div>
    </Footer>
  );
}

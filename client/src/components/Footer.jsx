import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
export default function FooterPage() {
  return (
    <Footer
      container
      className="py-3 px-6 mt-2 rounded-none"
      style={{ background: "#3E2723" }}
    >
      <Footer.Copyright href="#" by="Flowbite™" year={2022} />
      <div className="flex space-x-6 gap-2 items-center">
        <Footer.Icon href="#" icon={BsFacebook} />
        <Footer.Icon href="#" icon={BsInstagram} />
        <Footer.Icon href="#" icon={BsTwitter} />
        <Footer.Icon href="#" icon={BsGithub} />
        <Footer.Icon href="#" icon={BsDribbble} />
      </div>
    </Footer>
  );
}

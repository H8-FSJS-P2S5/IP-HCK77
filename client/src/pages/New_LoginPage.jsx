"use client";
import { Button, Card } from "flowbite-react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa"; // Import icons for Google and GitHub
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loginGitHub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        import.meta.env.VITE_GITHUB_Client_ID
    );
  };

  const getGitHubCode = () => {
    console.log(searchParams.get("code"), "CODE PARAMS");
  };

  const loginGoogle = () => {
    // Initialize the Google Sign-In button
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_Google_OAuth_Client_ID,
      callback: async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);

        const { data } = await axios.post(
          "https://api.fauzhanwahyudi.com/auth/google",
          {
            googleToken: response.credential,
          }
        );
        localStorage.setItem("access_token", data.access_token);
        navigate("/"); // Redirect to the home page or any other page after login
        Swal.fire({
          icon: "success",
          title: "Login Success",
          timer: 2000,
        });
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
    window.google.accounts.id.prompt(); // Optional prompt for One Tap dialog
  };

  useEffect(() => {
    loginGoogle();
    getGitHubCode();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-orange-500">
      <Card className="max-w-md p-6 space-y-6 shadow-md">
        <h1 className="text-center text-xl font-bold mb-4">
          Welcome Back! Please Log In
        </h1>
        {/* Google Login Button */}
        <div id="buttonDiv" className="w-full"></div>

        {/* GitHub Login Button with Icon */}
        <Button
          onClick={loginGitHub}
          className="w-full flex justify-center items-center gap-2 bg-gray-800 text-white hover:bg-gray-900"
        >
          <FaGithub size={20} />
          Login with GitHub
        </Button>

        {/* Cancel Button */}
        <Link to="/">
          <Button
            className="w-full bg-red-600 hover:bg-red-800 text-white"
            style={{ marginTop: "1rem" }}
          >
            Cancel
          </Button>
        </Link>
      </Card>
    </div>
  );
}

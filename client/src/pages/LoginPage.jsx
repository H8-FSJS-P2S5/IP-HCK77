"use client";
import { Card } from "flowbite-react";
import { useEffect } from "react";
import axios from "axios";
export default function LoginPage() {
  useEffect(() => {
    // Initialize the Google Sign-In button
    window.google.accounts.id.initialize({
      // to load the env in Vite project
      // please navigate to this doc -> https://vitejs.dev/guide/env-and-mode
      client_id: import.meta.env.VITE_Google_OAuth_Client_ID,
      // After the process is complete, the callback function will be called
      callback: async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);

        // Here is the logic to send the credential to the server
        // You can use axios or fetch to send the credential to the server
        const { data } = await axios.post(
          "https://api.fauzhanwahyudi.com/auth/google",
          {
            googleToken: response.credential,
          }
        );
        localStorage.setItem("access_token", data.access_token);

        // navigate to the home page or do magic stuff
      },
    });

    // Render the Google Sign-In button
    window.google.accounts.id.renderButton(
      // The ID of the HTML element where the button will be rendered
      document.getElementById("buttonDiv"),
      // Customize the button attributes
      { theme: "outline", size: "large" }
    );
    // Display the One Tap dialog; comment out to remove the dialog
    window.google.accounts.id.prompt();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-sm">
        <div id="buttonDiv"></div>
      </Card>
    </div>
  );
}

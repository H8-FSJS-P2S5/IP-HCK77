import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post("/login", {
                email,
            });
            // console.log(response, "<<< INI ACC");
            localStorage.setItem("access_token", response.data.access_token);

            navigate("/home");
        } catch (error) {
            console.log("🚀 ~ handleLogin ~ error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
            });
        }
    };

    async function handleCredentialResponse(response) {
        // console.log("Encoded JWT ID token: " + response.credential);
        try {
            const { data } = await axios({
                method: "POST",
                url: "/google-login",
                headers: {
                    googletoken: response.credential
                }
            })

            console.log(data, '<--- data berhasil google login');
            navigate("/home")
        } catch (error) {
            console.log(error, '<--- error google login');
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }, []);

    return (
        <>
            <div class="flex items-center justify-center min-h-screen bg-gray-800 ">
                <div class="bg-black p-8 rounded-lg shadow-md">
                    <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
                    <form onSubmit={handleLogin} class="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                class="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>
                        <div id="buttonDiv"></div>
                    </form>
                </div>
            </div>
        </>
    );
}

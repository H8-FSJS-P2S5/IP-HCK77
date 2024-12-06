import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";
import Swal from "sweetalert2";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    async function handleRegister(event) {
        try {
            event.preventDefault();
            const { data } = await axios({
                method: "POST",
                url: "/register",
                data: {
                    email,
                },
            });
            console.log(data, "<<< data");
            navigate("/login");
        } catch (err) {
            console.log("🚀 ~ handleRegister ~ err:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
            });
        }
    }

    return (
        <>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

"use client";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";
 
export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
   
    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        let body = {
            username: username,
            email: email,
            password: password,
        };
        const res = await fetchActionApi("/api/auth/local", {
            method: "POST",
            body: JSON.stringify(body),
        });
   
        if (res) {
            if (res.status !== 200) {
                console.log(res);
                alert("An error occurred");
            }
            console.log(res);
        }
    };
 
    return (
        <div className="flex justify-center pt-16">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={register} className="space-y-4">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://i.pinimg.com/736x/0b/93/bd/0b93bd083f0d9bff84aef7de98484468.jpg"
                        alt="Login Image"
                        className="w-[200px] h-[200px] object-contain rounded-xl"  // ขนาดภาพพอดีและมุมโค้ง
                    />
                </div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Confirm Password"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#424264] text-white font-semibold rounded-md hover:bg-[#223C63] focus:ring-2 focus:ring-[#223C63]"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
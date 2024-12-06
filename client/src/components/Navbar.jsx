import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        // <nav class="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                {/* <img src="/path-to-logo.png" alt="Logo" className="w-8 h-8" /> */}
                <h1 className="text-xl font-bold text-cyan-400">
                    GAMELIST
                    <span className="text-xs align-top text-gray-400 ml-1">
                        beta
                    </span>
                </h1>
            </div>

            {/* Menu Links */}
            <div className="flex space-x-6 text-sm font-medium">
                <a
                    href="#home"
                    className="text-cyan-400 hover:text-cyan-300 transition"
                >
                    Home
                </a>
                <a href="#about" className="hover:text-gray-300 transition">
                    About
                </a>
            </div>

            {/* Profile and Search */}
            <div className="flex items-center space-x-4">
                <img
                    src="/path-to-avatar.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-400"
                />
                <button className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-md font-medium">
                    Search
                </button>
            </div>
        </nav>
    );
}

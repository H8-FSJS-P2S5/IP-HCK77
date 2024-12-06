import React from "react";
import { useState } from "react";

export default function SearchModal({ isOpen, closeModal }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery("");
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Find a Game</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

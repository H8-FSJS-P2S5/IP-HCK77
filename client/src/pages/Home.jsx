import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../config/axiosInstance";
import GameList from "../components/GameList";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
    const [games, setGames] = useState([]);
    const [myLists, setMyList] = useState([]);
    const [recomen, setRecomen] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    let token = localStorage.getItem("token");

    const fetchGames = async () => {
        try {
            const { data } = await axios.get("/games", {
                params: {
                    q: searchQuery,
                },
            });
            // console.log(data);
            setGames(data);
        } catch (error) {
            console.log("🚀 ~ fetchGames ~ error:", error);
        }
    };

    const fetchMyList = async () => {
        try {
            const { data } = await axios.get("/myList", {
                headers: {
                    Authorization: `bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            });
            console.log("mylist", data);

            setMyList(data.data);
        } catch (error) {
            console.log("🚀 ~ fetchMyList ~ error:", error);
        }
    };

    async function add(game) {
        try {
            await axios.post(
                "/myList",
                {
                    GameId: game.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                }
            );
            await fetchGames();
            setMyList((prevList) => [...prevList, game]);
            // console.log(`${game.name} berhasil ditambahkan ke list`);
        } catch (error) {
            console.log("🚀 ~ handleOnAdd ~ error:", error);
        }
    }

    const handleOnAdd = async (e, game) => {
        e.preventDefault();
        await add(game);
        console.log(game, "<<< ADD GAME");
    };

    const handleDelete = async (id) => {
        // e.preventDefault();

        try {
            await axios.delete(`/myList/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            });

            fetchMyList();
        } catch (error) {
            console.log("🚀 ~ handleDelete ~ error:", error);
        }
    };

    const recom = async () => {
        const genAI = new GoogleGenerativeAI(
            import.meta.env.VITE_GEMINI_API_KEY
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Gimme 3 best game of the day ";

        const result = await model.generateContent(prompt);
        // console.log(result.response.text(), typeof result.response.text());
        setRecomen(result.response.text());
        console.log("recom", recomen);
    };

    useEffect(() => {
        fetchMyList();
        fetchGames();
        recom();
        // setRecomen(recom());
    }, [searchQuery]);

    return (
        <>
            <Navbar searchQuery={searchQuery} setSearchQuery={searchQuery} />
            <div className="bg-slate-900">
                <div className="h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-extrabold mb-4">
                        Welcome to GAMELIST
                    </h1>
                    <p className="text-xl mb-8 text-center">
                        Get your game collection and personal rating in one
                        place and share it with all world
                        {/* {recomen} */}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Search Games
                    </button>
                </div>
                <div className="px-10 py-6 bg-gray-800 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        AI Recommendations
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {recomen
                            ? recomen
                            : "Let AI recommend the best games for you!"}
                    </p>
                </div>
                {/* <h1> {JSON.stringify(recomen)}</h1> */}
                <div className="px-10 grid gap-5">
                    {games.map((game) => {
                        return (
                            <GameList
                                key={game.id}
                                game={game}
                                handleOnAdd={handleOnAdd}
                            />
                        );
                    })}
                </div>
                <div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            My List
                        </h2>
                        <div className="space-y-4">
                            {myLists.length > 0 ? (
                                myLists.map((list) => (
                                    <div
                                        key={list.Game?.id}
                                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
                                    >
                                        {/* Gambar */}
                                        <div className="flex items-center">
                                            <img
                                                src={list.Game?.imageUrl} // Pastikan `image` tersedia di data Anda
                                                alt={list.Game?.name}
                                                className="w-16 h-16 rounded-lg mr-4"
                                            />
                                            <div>
                                                {/* Nama dan Genre */}
                                                <p className="text-white text-lg font-semibold">
                                                    {list.Game?.name}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {list.Game?.genre}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Rating: {list.Game?.rating}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tanggal dan Tombol */}
                                        <div className="flex items-center">
                                            <p className="text-gray-400 text-sm mr-4">
                                                {list.Game?.released}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    handleDelete(list.id)
                                                }
                                                className="flex items-center justify-center bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-colors"
                                            >
                                                &times;{" "}
                                                {/* Simbol silang (X) untuk Delete */}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">
                                    Belum ada game di My List.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

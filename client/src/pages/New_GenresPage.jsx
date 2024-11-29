"use client";
import { useEffect } from "react";
import { getRecommendation } from "../features/recom/recomSlice";
import { Card, Spinner, Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../features/genres/genresSlice";
import { useDispatch, useSelector } from "react-redux";
import { setGenreId } from "../features/genreId/genreIdSlice";
import { setOpenModal } from "../features/openModal/openModal";

export default function GenresPage() {
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRecomOnClick = (genre) => {
    dispatch(setOpenModal(true));
    dispatch(getRecommendation("", genre));
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div className="flex justify-center h-screen items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Card
        className="w-full max-w-4xl p-6 shadow-lg border border-gray-600 overflow-auto"
        style={{ background: "#383838", color: "#EDEDED", maxHeight: "80vh" }}
      >
        {genresRedux && genresRedux.length > 0 ? (
          <Table hoverable className="text-center">
            <Table.Head>
              <Table.HeadCell>Genres</Table.HeadCell>
              <Table.HeadCell>MyAnimeList Link</Table.HeadCell>
              <Table.HeadCell>Potion</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {genresRedux.map((genre, index) => (
                <Table.Row
                  key={index + 1}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-700"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {genre.name}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={genre.url}
                      className="text-yellow-500 hover:underline"
                    >
                      Go to MyAnimeList
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => {
                        dispatch(setGenreId(genre.id));
                        getRecomOnClick(genre.name);
                      }}
                      style={{
                        color: "#FB8C00",
                        padding: "0.75rem 2rem",
                        fontWeight: "600",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#FB8C00";
                        e.target.style.color = "#ffff";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#ffff";
                        e.target.style.color = "#FB8C00";
                      }}
                    >
                      Request Potion
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Spinner size="xl" color="yellow" />
            <h1 className="text-yellow-500">Loading your genres...</h1>
          </div>
        )}
      </Card>
    </div>
  );
}

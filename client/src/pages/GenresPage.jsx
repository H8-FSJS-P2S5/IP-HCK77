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
  }, []);
  return (
    <div className="container flex justify-center items-center mt-3">
      <Card>
        {genresRedux && genresRedux.length > 0 ? (
          <Table hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>Genres</Table.HeadCell>
              <Table.HeadCell>MyAnimeList Link</Table.HeadCell>
              <Table.HeadCell>Potion</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {genresRedux.map((genre, index) => (
                <Table.Row
                  key={index + 1}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {genre.name}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={genre.url}>Go to MyAnimeList</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      // to={`/?genre=${genre.name}`}
                      onClick={() => {
                        dispatch(setGenreId(genre.id));
                        getRecomOnClick(genre.name);
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
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
            <Spinner size="xl" />
            <h1>Loading your cauldron...</h1>
          </div>
        )}
      </Card>
    </div>
  );
}

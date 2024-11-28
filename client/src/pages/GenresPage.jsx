"use client";
import { useEffect } from "react";

import { Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchGenres } from "../features/genres/genresSlice";
import { useDispatch, useSelector } from "react-redux";
export default function GenresPage() {
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);
  return (
    <div className="container flex justify-center items-center">
      <Card>
        <Table hoverable>
          <Table.Head className="text-center">
            <Table.HeadCell>Genres</Table.HeadCell>
            <Table.HeadCell>MyAnimeList Link</Table.HeadCell>
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
                  <Link
                    to={`/?${genre.name}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Request Potion
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}

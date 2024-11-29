import { Card, Textarea, Label, Select, Modal, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { fetchGenres } from "../features/genres/genresSlice";
import { getRecommendation } from "../features/recom/recomSlice";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import { fetchProfile } from "../features/profile/profileSlice";
import { postPotion } from "../features/potion/potionSlice";
import { setOpenModal } from "../features/openModal/openModal";
import { setGenreId } from "../features/genreId/genreIdSlice";

export default function HomePage() {
  const myCauldrons = useSelector((state) => state.myCauldronReducer.value);
  const genres = useSelector((state) => state.genresReducer.value);
  const genreId = useSelector((state) => state.genreIdReducer.value);
  const loading = useSelector((state) => state.loadingReducer.value);
  const isModalOpen = useSelector((state) => state.openModalReducer.value);
  const recommendation = useSelector(
    (state) => state.recommendationReducer.value
  );

  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("Create your initial synopsis...");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchMyCauldron());
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (synopsis === "Create your initial synopsis...") setSynopsis("");
      dispatch(getRecommendation(synopsis, genre));
    } catch (error) {
      console.error("Error submitting recommendation request:", error);
    }
  };

  const handleSavePotion = () => {
    const cauldronId = myCauldrons[0]?.id;
    dispatch(postPotion(recommendation.recommendation, genreId, cauldronId));
    dispatch(setOpenModal(false));
    dispatch(fetchMyCauldron());
    navigate("/user/my-cauldron");
  };

  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Input Card */}
      <Card
        className="w-full max-w-3xl p-6 shadow-lg border border-gray-600"
        style={{ background: "#383838", color: "#EDEDED" }}
      >
        <h2 className="text-2xl font-semibold text-center text-yellow-500">
          Create Your Potion
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Synopsis Input */}
          <div>
            <Label
              htmlFor="synopsis"
              value="Enter a brief synopsis:"
              className="text-gray-300 font-medium"
            />
            <Textarea
              id="synopsis"
              placeholder={synopsis}
              onChange={(event) => setSynopsis(event.target.value)}
              className="mt-2 p-3 rounded-md border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Genre Selector */}
          <div>
            <Label
              htmlFor="genre"
              value="Select a genre:"
              className="text-gray-300 font-medium"
            />
            <Select
              id="genre"
              onChange={(event) => {
                dispatch(setGenreId(event.target.selectedIndex));
                setGenre(event.target.value);
              }}
              className="mt-2 p-3 rounded-md border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option selected disabled value="">
                Choose a genre
              </option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="rounded-lg"
              style={{
                backgroundColor: "#FFA726",
                border: "1px solid #FB8C00",
                color: "#FFFFFF",
                padding: "0.75rem 2rem",
                fontWeight: "600",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#FB8C00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA726")}
            >
              Request Potion
            </button>
          </div>
        </form>
      </Card>

      {/* Recommendation Card */}
      {recommendation.recommendation && (
        <Card
          className="w-full max-w-3xl mt-4 p-4 shadow-lg rounded-lg cursor-pointer border border-gray-600 transition-transform transform hover:scale-105"
          onClick={() => dispatch(setOpenModal(true))}
          style={{ background: "#404040", color: "#EDEDED" }}
        >
          <div className="flex items-center gap-2">
            <GiClick size={24} className="text-yellow-500" />
            <h3 className="text-xl font-semibold text-yellow-500">
              Click to view the full potion!
            </h3>
          </div>
          <p
            className="mt-2 text-gray-300 line-clamp-3"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "4",
            }}
          >
            {recommendation.recommendation}
          </p>
        </Card>
      )}

      {/* Recommendation Modal */}
      <Modal show={isModalOpen} onClose={() => dispatch(setOpenModal(false))}>
        <Modal.Header style={{ background: "#494949" }}>
          <h1 style={{ color: "#FFCA28" }}>Concocted Potion</h1>
        </Modal.Header>
        <Modal.Body style={{ background: "#3A3A3A", color: "#FFFFFF" }}>
          {!loading ? (
            <p>{recommendation.recommendation}</p>
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <Spinner size="xl" color="yellow" />
              <h1 className="text-yellow-500">
                Please wait, concoction in progress...
              </h1>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          className="flex justify-center gap-4"
          style={{ background: "#494949" }}
        >
          <button
            onClick={handleSavePotion}
            className="rounded-lg"
            style={{
              backgroundColor: "#FFA726",
              border: "1px solid #FB8C00",
              color: "#FFFFFF",
              padding: "0.75rem 2rem",
              fontWeight: "600",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FB8C00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA726")}
          >
            Save Potion
          </button>
          <button
            className="rounded-lg"
            color="gray"
            onClick={() => dispatch(setOpenModal(false))}
            style={{
              backgroundColor: "#757575",
              color: "#FFFFFF",
              padding: "0.75rem 2rem",
              fontWeight: "600",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#616161")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#757575")}
          >
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

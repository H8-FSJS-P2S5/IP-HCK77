import {
  Button,
  Card,
  Textarea,
  Label,
  Select,
  Modal,
  Spinner,
} from "flowbite-react";
const primaryColor = "blue"; // Replace with your primary color
const secondaryColor = "gray"; // Replace with your secondary color

import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../../features/genres/genresSlice";
import { useEffect, useState } from "react";
import { getRecommendation } from "../../features/recom/recomSlice";
import { GiClick } from "react-icons/gi";
import { fetchMyCauldron } from "../../features/myCauldron/myCauldronSlice";
import { fetchProfile } from "../../features/profile/profileSlice";
import { postPotion } from "../../features/potion/potionSlice";
import { useNavigate } from "react-router-dom";
import { setOpenModal } from "../../features/openModal/openModal";
import { setGenreId } from "../../features/genreId/genreIdSlice";

export default function HomePage() {
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value
  );
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const genreIdRedux = useSelector((state) => state.genreIdReducer.value);
  const loadingRedux = useSelector((state) => state.loadingReducer.value);
  const openModalRedux = useSelector((state) => state.openModalReducer.value);
  const recomRedux = useSelector((state) => state.recommendationReducer.value);

  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("Create your initial synopsis...");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("input", synopsis, genre);
      if (synopsis == "Create your initial synopsis...") {
        setSynopsis(" ");
      }
      dispatch(getRecommendation(synopsis, genre));
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchMyCauldron());
    dispatch(fetchProfile());
  }, []);
  return (
    <div className="flex flex-col gap-2 max-h-screen h-screen justify-center items-center text-amber-600">
      <Card className={`w-1/2 rounded-lg shadow-${primaryColor}-200`}>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="synopsis" value="Synopsis" />
            </div>
            <Textarea
              placeholder={synopsis}
              onChange={(event) => setSynopsis(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Select
                id="genre"
                onChange={(event) => {
                  // console.log(event);
                  dispatch(setGenreId(event.target.selectedIndex));
                  setGenre(event.target.id);
                }}
              >
                <option selected disabled value={""}>
                  Select Synopsis Genre
                </option>
                {genresRedux.map((genreRedux, index) => (
                  <option key={genreRedux.id} value={genreRedux.name}>
                    {genreRedux.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <Button type="submit">Request Potion</Button>
          </div>
        </form>
      </Card>
      {recomRedux.recommendation && (
        <Card
          className="w-1/2 rounded-lg shadow-${primaryColor}-200 hover:bg-${primaryColor}-100 cursor-pointer"
          onClick={() => dispatch(setOpenModal(true))}
          style={{
            cursor: "pointer",
          }}
        >
          <span>
            <GiClick />
            <h3 className="text-center font-bold underline">
              Click to see details
            </h3>
          </span>
          <div>
            <h3
              style={{
                ["overflow"]: "hidden",
                ["display"]: "-webkit-box",
                ["-webkit-box-orient"]: "vertical",
                ["-webkit-line-clamp"]: "4",
                border: "1 solid yellow",
              }}
            >
              {recomRedux.recommendation}
            </h3>
          </div>
        </Card>
      )}
      <Modal
        show={openModalRedux}
        onClose={() => dispatch(setOpenModal(false))}
      >
        <Modal.Header>Concocted Potion :</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {!loadingRedux ? (
                recomRedux.recommendation
              ) : (
                <div className="flex flex-col justify-center items-center gap-3">
                  <Spinner size="xl" />
                  <h1>Please wait concoction in progress....</h1>
                </div>
              )}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-3">
          <Button
            onClick={() => {
              const cauldronId = myCauldronsRedux[0].id;
              // console.log(cauldronId);
              console.log(recomRedux.recommendation, genreIdRedux, cauldronId);
              dispatch(
                postPotion(recomRedux.recommendation, genreIdRedux, cauldronId)
              );
              dispatch(setOpenModal(false));
              dispatch(fetchMyCauldron());
              navigate("/user/my-cauldron");
            }}
          >
            Save Potion To Cauldron
          </Button>
          <Button color="gray" onClick={() => dispatch(setOpenModal(false))}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

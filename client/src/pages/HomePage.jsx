import { Button, Card, Textarea, Label, Select, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../features/genres/genresSlice";
import { useEffect, useState } from "react";
import { getRecommendation } from "../features/recom/recomSlice";
import { GiClick } from "react-icons/gi";
export default function HomePage() {
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const recomRedux = useSelector((state) => state.recommendationReducer.value);
  const [synopsis, setSynopsis] = useState("Create your initial synopsis...");
  const [genre, setGenre] = useState("");

  const [openModal, setOpenModal] = useState(true);
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
  }, []);
  return (
    <div className="flex flex-col gap-2 max-h-screen h-screen justify-center items-center">
      <Card className="w-1/2">
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
                onChange={(event) => setGenre(event.target.value)}
              >
                <option selected disabled value={""}>
                  Select Synopsis Genre
                </option>
                {genresRedux.map((genre, index) => (
                  <option key={index} value={genre.name}>
                    {genre.name}
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
          className="w-1/2"
          onClick={() => setOpenModal(true)}
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Concocted Potion :</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {recomRedux.recommendation}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-3">
          <Button onClick={() => setOpenModal(false)}>
            Save Potion To Cauldron
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

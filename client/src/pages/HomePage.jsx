import { Button, Card, Textarea, Label, Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../features/genres/genresSlice";
import { useEffect, useState } from "react";
import { getRecommendation } from "../features/recom/recomSlice";

export default function HomePage() {
  const genresRedux = useSelector((state) => state.genresReducer.value);
  const recomRedux = useSelector((state) => state.recommendationReducer.value);
  const [synopsis, setSynopsis] = useState("Create your initial synopsis...");
  const [genre, setGenre] = useState("");
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
    <div className="flex flex-col max-h-screen h-screen justify-center items-center">
      <Card className="w-1/2">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div>
            {recomRedux.length > 100 ? (
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
            ) : (
              <h3>You have not request a potion (synopsis)</h3>
            )}
          </div>
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
    </div>
  );
}

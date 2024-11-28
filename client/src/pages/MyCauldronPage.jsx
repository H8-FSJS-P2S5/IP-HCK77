import { Button, Card } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import Swal from "sweetalert2";
import { serverInstance } from "../helpers/axiosInstance";

export default function MyCauldronPage() {
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value
  );
  const cauldronId = myCauldronsRedux[0].id;
  const filteredCauldron = myCauldronsRedux.filter(
    (cauldron) => cauldron.id == cauldronId
  );
  const potions = filteredCauldron.map((cauldron) => cauldron.Potion);
  const dispatch = useDispatch();

  const deletePotion = async (potionId) => {
    try {
      await serverInstance.delete(
        `/cauldrons/${cauldronId}/potions/${potionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(fetchMyCauldron());
    } catch (error) {
      console.log("🚀 ~ deletePotion ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  useEffect(() => {
    dispatch(fetchMyCauldron());
  }, []);
  return (
    <div className="container h-screen flex justify-center items-center">
      <Card
        className="max-w-5xl overflow-auto flex flex-col"
        style={{ maxHeight: "70vh" }}
      >
        {myCauldronsRedux && (
          <>
            <div style={{ display: "sticky", top: "0", overflow: "auto" }}>
              <h1 className="text-center font-bold">
                {myCauldronsRedux[0].name}
              </h1>
            </div>
            {potions.map((potion) => (
              <div className="container overflow-auto" key={potion.id}>
                <Card key={potion.id}>
                  {myCauldronsRedux[0].Potion.recommendation}
                  <Button
                    className="bg-red-600"
                    onClick={() => deletePotion(potion.id)}
                  >
                    Delete
                  </Button>
                </Card>
              </div>
            ))}
          </>
        )}
      </Card>

      {/* {JSON.stringify(potions)} */}
    </div>
  );
}

import { Button, Card, Modal, Spinner, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCauldron } from "../features/myCauldron/myCauldronSlice";
import { setOpenModal } from "../features/openModal/openModal";
import {
  deletePotion,
  setPotion,
  updatePotion,
} from "../features/potion/potionSlice";

export default function MyCauldronPage() {
  const openModalRedux = useSelector((state) => state.openModalReducer.value);
  const potionRedux = useSelector((state) => state.potionReducer.value);
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value
  );
  const cauldronId = myCauldronsRedux?.[0]?.id;
  const filteredCauldron = myCauldronsRedux.filter(
    (cauldron) => cauldron.id == cauldronId
  );
  const potions = filteredCauldron.map((cauldron) => cauldron?.Potion || []);
  const [recommendation, setRecommendation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenModal(false));
    dispatch(fetchMyCauldron());
  }, []);
  return (
    <div className="container h-screen flex justify-center items-center">
      <Card
        className="max-w-5xl overflow-auto flex flex-col"
        style={{ maxHeight: "70vh" }}
      >
        {myCauldronsRedux.length > 0 ? (
          <>
            <div style={{ display: "sticky", top: "0", overflow: "auto" }}>
              <h1 className="text-center font-bold">
                {myCauldronsRedux[0].name}
              </h1>
            </div>
            {potions && potions.length > 0 ? (
              potions.map((potion) => (
                <div className="container overflow-auto" key={potion.id}>
                  <Card key={potion.id}>
                    {myCauldronsRedux[0].Potion.recommendation}
                    <div className="flex gap-2 container justify-center">
                      <Button
                        className="bg-yellow-400"
                        style={{ width: "40%" }}
                        onClick={() => {
                          dispatch(setOpenModal(true));
                          dispatch(setPotion(potion));
                        }}
                      >
                        Edit Potion
                      </Button>
                      <Button
                        className="bg-red-600"
                        style={{ width: "40%" }}
                        onClick={() => deletePotion(potion.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <h1>You do not have any potion</h1>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Spinner size="xl" />
            <h1>Loading your cauldron...</h1>
          </div>
        )}
      </Card>

      <Modal
        show={openModalRedux}
        onClose={() => dispatch(setOpenModal(false))}
      >
        <Modal.Header className="text-center">Edit Potion</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Textarea
              className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              style={{ height: "40vh" }}
              onChange={(event) => {
                setRecommendation(event.target.value);
              }}
            >
              {potionRedux.recommendation}
            </Textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-3">
          <Button
            onClick={() => {
              dispatch(
                updatePotion({
                  recommendation,
                  GenreId: potionRedux.GenreId,
                  CauldronId: cauldronId,
                  id: potionRedux.id,
                })
              );
              dispatch(fetchMyCauldron());
              dispatch(setOpenModal(false));
            }}
          >
            Save Potion
          </Button>
          <Button color="gray" onClick={() => dispatch(setOpenModal(false))}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

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
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyCauldronPage() {
  const profileRedux = useSelector((state) => state.profileReducer.value);

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
    console.log("MyCauldronsRedux:", myCauldronsRedux);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <Card
        className="max-w-5xl overflow-auto flex flex-col p-6 shadow-lg border border-gray-600"
        style={{
          maxHeight: "70vh",
          backgroundColor: "#383838",
          color: "#EDEDED",
        }}
      >
        {myCauldronsRedux.length > 0 ? (
          <>
            <div className="flex w-full justify-center items-center gap-2">
              <img
                src={profileRedux.profilePicture}
                width={"100px"}
                height={"100px"}
                style={{
                  borderStartEndRadius: "9999px",
                  borderStartStartRadius: "9999px",
                }}
                alt=""
                className="p-0 m-0 self"
              />
              <h1 className="text-center font-bold text-yellow-500 text-2xl">
                {myCauldronsRedux[0].name}{" "}
              </h1>
              <Link to="/user/profile">
                <FaRegEdit className="inline cursor-pointer text-yellow-500 text-2xl" />
              </Link>
            </div>
            {potions && potions.length > 0 ? (
              potions.map((potion) => (
                <div className="container overflow-auto mb-4" key={potion.id}>
                  <Card
                    className="p-4 shadow-lg border border-gray-600"
                    style={{ backgroundColor: "#404040", color: "#EDEDED" }}
                  >
                    <p>{potion.recommendation}</p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button
                        style={{ width: "40%", backgroundColor: "#FFA726" }}
                        onClick={() => {
                          dispatch(setOpenModal(true));
                          dispatch(setPotion(potion));
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#FB8C00")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#FFA726")
                        }
                      >
                        Edit Potion
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-500 text-white"
                        style={{ width: "40%" }}
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(deletePotion(potion));
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-300">
                You do not have any potion
              </h1>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Spinner size="xl" color="warning" />
            <h1 className="text-yellow-500">Loading your cauldron...</h1>
          </div>
        )}
      </Card>

      <Modal
        show={openModalRedux}
        onClose={() => dispatch(setOpenModal(false))}
        className="bg-gray-700 text-white"
      >
        <Modal.Header className="text-center bg-gray-800">
          <h2 className="text-yellow-500">Edit Potion</h2>
        </Modal.Header>
        <Modal.Body className="bg-gray-800">
          <div className="space-y-6">
            <Textarea
              className="text-base leading-relaxed text-gray-500 dark:text-gray-400 bg-gray-700"
              style={{ height: "40vh" }}
              onChange={(event) => {
                setRecommendation(event.target.value);
              }}
            >
              {potionRedux.recommendation}
            </Textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-3 bg-gray-800">
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
            className="bg-yellow-500 hover:bg-yellow-400 text-white"
          >
            Save Potion
          </Button>
          <Button
            color="gray"
            onClick={() => dispatch(setOpenModal(false))}
            className="bg-gray-500 hover:bg-gray-400 text-white"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

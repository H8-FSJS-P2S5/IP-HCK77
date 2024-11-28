import { Card } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCauldron } from "../src/features/myCauldron/myCauldronSlice";

export default function MyCauldronPage() {
  const myCauldronsRedux = useSelector(
    (state) => state.myCauldronReducer.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyCauldron());
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container">
        <Card>{JSON.stringify(myCauldronsRedux)}</Card>
      </div>
    </div>
  );
}

import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";

const initialState = {
  value: [],
};

export const myCauldronSlice = createSlice({
  name: "myCauldron",
  initialState,
  reducers: {
    setMyCauldron: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMyCauldron } = myCauldronSlice.actions;

export default myCauldronSlice.reducer;

export const fetchMyCauldron = () => async (dispatch) => {
  try {
    let { data } = await serverInstance.get("/cauldrons", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const cauldrons = data.cauldrons.map((cauldron) => {
      delete cauldron.createdAt;
      delete cauldron.updatedAt;
      return cauldron;
    });
    dispatch(setMyCauldron(cauldrons));
  } catch (error) {
    console.log("🚀 ~ fetchMyCauldron ~ error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

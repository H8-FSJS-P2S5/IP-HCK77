import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";
const initialState = {
  value: {},
};

export const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setRecommendation: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;

export const getRecommendation = (synopsis, genre) => async (dispatch) => {
  try {
    let { data } = await serverInstance.post("/recommendation", {
      synopsis,
      genre,
    });
    dispatch(setRecommendation(data));
  } catch (error) {
    console.log("ini error KKKKKKKKKKKKKKKKKK");
    console.log("🚀 ~ getRecommendation ~ error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

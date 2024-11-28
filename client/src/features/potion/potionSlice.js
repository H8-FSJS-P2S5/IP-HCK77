import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";
const initialState = {
  value: {},
};

export const potionSlice = createSlice({
  name: "potion",
  initialState,
  reducers: {
    setPotion: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPotion } = potionSlice.actions;

export default potionSlice.reducer;

export const postPotion =
  (recommendation, GenreId, cauldronId) => async (dispatch) => {
    try {
      let { data } = await serverInstance.post(
        `/cauldrons/${cauldronId}/potions`,
        {
          recommendation,
          GenreId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(data);
      // dispatch(setPotion(cauldrons));
    } catch (error) {
      console.log("🚀 ~ postPotion ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

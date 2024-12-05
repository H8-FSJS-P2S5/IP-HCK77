import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";
import Swal from "sweetalert2";
import { fetchMyCauldron } from "../myCauldron/myCauldronSlice";
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
      Swal.fire({
        icon: "success",
        title: "Your potion is saved",
        timer: 2000,
      });
      dispatch(fetchMyCauldron());
    } catch (error) {
      console.log("🚀 ~ postPotion ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
      });
    }
  };

export const updatePotion = (potion) => async (dispatch) => {
  try {
    const { id, GenreId, recommendation, CauldronId } = potion;
    let { data } = await serverInstance.put(
      `/cauldrons/${CauldronId}/potions/${id}`,
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
    console.log("🚀 ~ updatePotion ~ data:", data);
    Swal.fire({
      icon: "success",
      title: "Your potion is updated",
      timer: 2000,
    });
    dispatch(fetchMyCauldron());
  } catch (error) {
    console.log("🚀 ~ postPotion ~ error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message,
    });
  }
};

export const deletePotion = (potion) => async (dispatch) => {
  try {
    const { id, CauldronId } = potion;
    await serverInstance.delete(`/cauldrons/${CauldronId}/potions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "Your potion is deleted",
      timer: 2000,
    });
    dispatch(fetchMyCauldron());
  } catch (error) {
    console.log("🚀 ~ deletePotion ~ error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error?.response?.data?.message,
    });
  }
};

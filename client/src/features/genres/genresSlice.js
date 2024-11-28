import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../helpers/axiosInstance";

const initialState = {
  value: [],
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;

export const fetchGenres = () => async (dispatch) => {
  try {
    let { data } = await serverInstance.get("/genres");
    const genres = data.genres.map((genre) => {
      delete genre.createdAt;
      delete genre.updatedAt;
      return genre;
    });
    dispatch(setGenres(genres));
  } catch (error) {
    console.log("🚀 ~ fetchGenres ~ error:", error);
  }
};

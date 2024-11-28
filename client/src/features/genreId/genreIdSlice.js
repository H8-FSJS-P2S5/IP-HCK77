import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const genreIdSlice = createSlice({
  name: "genreId",
  initialState,
  reducers: {
    setGenreId: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenreId } = genreIdSlice.actions;

export default genreIdSlice.reducer;

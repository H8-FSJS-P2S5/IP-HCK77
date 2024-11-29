import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const openModalSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenModal } = openModalSlice.actions;

export default openModalSlice.reducer;

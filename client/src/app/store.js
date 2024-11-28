import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../src/features/genres/genresSlice";
import myCauldronReducer from "../src/features/myCauldron/myCauldronSlice";
import profileReducer from "../src/features/profile/profileSlice";

export const store = configureStore({
  reducer: { genresReducer, myCauldronReducer, profileReducer },
});

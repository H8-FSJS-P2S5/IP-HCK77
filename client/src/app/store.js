import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../features/genres/genresSlice";
import myCauldronReducer from "../features/myCauldron/myCauldronSlice";
import profileReducer from "../features/profile/profileSlice";
import recommendationReducer from "../features/recom/recomSlice";

export const store = configureStore({
  reducer: {
    genresReducer,
    myCauldronReducer,
    profileReducer,
    recommendationReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../features/genres/genresSlice";
import myCauldronReducer from "../features/myCauldron/myCauldronSlice";
import profileReducer from "../features/profile/profileSlice";
import recommendationReducer from "../features/recom/recomSlice";
import loadingReducer from "../features/loading/loadingSlice";
import genreIdReducer from "../features/genreId/genreIdSlice";
import openModalReducer from "../features/openModal/openModal";

export const store = configureStore({
  reducer: {
    genresReducer,
    myCauldronReducer,
    profileReducer,
    recommendationReducer,
    loadingReducer,
    genreIdReducer,
    openModalReducer,
  },
});

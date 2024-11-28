import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../src/features/genres/genresSlice";

export const store = configureStore({
  reducer: { genresReducer },
});

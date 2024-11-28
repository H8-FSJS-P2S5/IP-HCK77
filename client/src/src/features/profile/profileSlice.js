import { createSlice } from "@reduxjs/toolkit";
import { serverInstance } from "../../../helpers/axiosInstance";

const initialState = {
  value: {},
};

export const profileSlice = createSlice({
  name: "myCauldron",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      // console.log(action.payload); check action data
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const fetchProfile = () => async (dispatch) => {
  try {
    let { data } = await serverInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    delete data.createdAt;
    delete data.updatedAt;
    dispatch(setProfile(data));
  } catch (error) {
    console.log("🚀 ~ fetchProfile ~ error:", error);
  }
};

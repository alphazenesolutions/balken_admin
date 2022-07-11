import { configureStore, createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    newUser: false,
  },
  reducers: {
    newUserHandler(state) {
      state.newUser = !state.newUser;
    },
  },
});

export const loginAction = LoginSlice.actions;
const Store = configureStore(LoginSlice);
export default Store;

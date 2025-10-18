import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      console.log(action.payload.token, "action.payload.token");
      state.token = action.payload.token;
      Cookies.set("accessToken", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

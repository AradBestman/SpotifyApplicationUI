import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState = {
  loggedIn: false,
  likedSongs: [],
  userData: {
    isAdmin: false,
  },
};

export const useLikedSongs = () => {
  const likedSongs = useSelector((pie) => pie.authSlice.likedSongs);

  return {
    likedSongs,
    isLiked: (id) => {
      return likedSongs.findIndex((song) => song._id == id) !== -1;
    },
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLikedSongs(state, action) {
      state.likedSongs = action.payload;
    },
    //collection of functions to setState
    login(state, action) {
      state.loggedIn = true;
      // console.log("action", action);
      state.userData = action.payload;
      console.log(action.payload, "ACtion logggg");
    },
    setToken(state, action) {
      state.token = action.payload;
    },

    logout(state) {
      state.loggedIn = false;
      state.userData = {
        isAdmin: false,
      };
    },
  },
});

//export the set functions for the components to make use of the actions
export const authActions = authSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default authSlice.reducer;

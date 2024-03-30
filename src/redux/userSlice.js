import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";

const initialState = {
  currentUser: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const login = (email, password, fn) => async (dispatch) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (userCredential && userCredential.user) {
      const { uid, email } = userCredential.user;
      if (fn) {
        fn();
      }
      dispatch(setCurrentUser({ uid, email }));
    } else {
      alert("No user Found");
      throw new Error("Failed to login: User not found");
    }
  } catch (error) {
    alert("No user Found");
    throw new Error("Failed to login: " + error.message);
  }
};

export const signup = (name, email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredential.user.updateProfile({
      displayName: name,
    });
    dispatch(setCurrentUser(userCredential.user));
  } catch (error) {
    throw new Error("Failed to sign up: " + error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(setCurrentUser(null));
  } catch (error) {
    throw new Error("Failed to logout: " + error.message);
  }
};

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;

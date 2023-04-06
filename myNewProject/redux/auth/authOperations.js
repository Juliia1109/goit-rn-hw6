import { auth } from "../../firebase/config";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getSatte) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login });
      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateCahngeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

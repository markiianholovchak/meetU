import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config/firebase-config";
import { LOCAL_STORAGE_AUTH_KEY } from "./constants/general.constants";
import { firebaseUserToUser } from "./transformers/firebase.transformers";
import { useMainStore } from "./store/store";
import { createUser, getUser } from "./api/users.api";

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = firebaseUserToUser(result.user);

    const dbUser = await getUser(user.id);

    if (!dbUser) {
        await createUser(user);
    }

    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
    useMainStore.getState().setUser(user);
};

export const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    useMainStore.getState().setUser(null);
};

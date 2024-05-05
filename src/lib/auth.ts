import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth, provider } from "./config/firebase-config";
import { LOCAL_STORAGE_AUTH_KEY } from "./constants/general.constants";
import { firebaseUserToUser } from "./transformers/firebase.transformers";
import { useMainStore } from "./store/store";
import { createUser, getUser } from "./api/users.api";

export const updateSessionUser = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
};

const handleAuthenticatedUser = async (firebaseUser: FirebaseUser, providerId: AuthProvider) => {
    const user = firebaseUserToUser(firebaseUser, providerId);

    const dbUser = await getUser(user.id);

    if (!dbUser) {
        await createUser(user);
    }

    updateSessionUser(user);
    useMainStore.getState().setUser(user);
};

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    await handleAuthenticatedUser(result.user, result.providerId);
};

export const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    username: string
) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await handleAuthenticatedUser({ ...result.user, displayName: username }, result.providerId);
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        await handleAuthenticatedUser(result.user, result.providerId);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    useMainStore.getState().setUser(null);
};

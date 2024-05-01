import { signInWithPopup, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "./config/firebase-config";
import { LOCAL_STORAGE_AUTH_KEY } from "./constants/general.constants";
import { firebaseUserToUser } from "./transformers/firebase.transformers";
import { useMainStore } from "./store/store";
import { ref, update, get} from "firebase/database";
import { database } from "./config/firebase-config";

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = firebaseUserToUser(result.user);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
    useMainStore.getState().setUser(user);
};

export const signInWithEmail = async (email: string, password: string) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = firebaseUserToUser(userCredential.user);
        // get data from database not working
        console.log(ref(database, `users/${user.id}`));
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
        useMainStore.getState().setUser(user);
        } catch (error) {
        console.error("Error signing in with email:", error);
        throw error;
    }
};

async function getUserData(userId: string) {
  const userRef = ref(database, `users/${userId}`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log('No user data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}


export async function updateProfile(uid: string, data: { name: string; email: string }) {
    const databaseRef = ref(database,`users/${uid}`);
    try {
        update(ref(database, `users/${uid}`), {
            name: data.name,
            email: data.email,
        });
    } catch (error) {
        throw new Error("Failed to update user data in Firebase Database.");
    }
}

export const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    useMainStore.getState().setUser(null);
};


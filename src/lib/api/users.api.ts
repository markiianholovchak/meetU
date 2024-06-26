import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const getUser = async (id: string): Promise<User | null> => {
    const ref = doc(collection(db, "users"), id);
    const querySnapshot = await getDoc(ref);
    const data = querySnapshot.data();
    if (!data) return null;

    return {
        id,
        ...data
    } as User;
};

export const createUser = async (user: User) => {
    await setDoc(doc(db, "users", user.id), user);
};

export const updateUser = async (id: string, data: Partial<User>) => {
    await updateDoc(doc(db, "users", id), data);
};

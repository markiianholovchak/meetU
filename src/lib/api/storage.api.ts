import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase-config";

export const uploadFileToStorage = async (file: File) => {
    const storageRef = ref(storage, new Date().toISOString());
    const snapshot = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(snapshot.ref);

    return url;
};

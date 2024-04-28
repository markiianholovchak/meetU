import { User as FirebaseUser } from "firebase/auth";

export const firebaseUserToUser = (user: FirebaseUser): User => {
    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL
    };
};

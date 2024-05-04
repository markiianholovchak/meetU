import { User as FirebaseUser } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export const firebaseUserToUser = (user: FirebaseUser): User => {
    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL
    };
};

export const fireBaseEventDocToEvent = (
    docId: string,
    docData: DocumentData,
    createdBy: User | null
): CreatedEvent => {
    return {
        ...docData,
        date: new Date(docData.date.seconds * 1000),
        id: docId,
        createdBy
    } as CreatedEvent;
};

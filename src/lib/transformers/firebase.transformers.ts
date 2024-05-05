import { User as FirebaseUser } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export const firebaseUserToUser = (user: FirebaseUser, provider: AuthProvider): User => {
    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        provider
    };
};

export const fireBaseEventDocToEvent = (
    docId: string,
    docData: DocumentData,
    createdBy: User | null
): CreatedEvent => {
    return {
        ...docData,
        participants: [] as Participant[],
        date: new Date(docData.date.seconds * 1000),
        id: docId,
        createdBy
    } as CreatedEvent;
};

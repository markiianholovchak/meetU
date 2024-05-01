import { User as FirebaseUser } from "firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const firebaseUserToUser = (user: FirebaseUser): User => {
    return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL
    };
};

export const fireBaseEventDocToEvent = (
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>
): CreatedEvent => {
    const docData = doc.data();
    return {
        ...docData,
        date: new Date(docData.date.seconds * 1000),
        id: doc.id
    } as CreatedEvent;
};

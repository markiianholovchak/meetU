import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { fireBaseEventDocToEvent } from "../transformers/firebase.transformers";

export const createEvent = async (event: CreateEventData): Promise<CreatedEvent> => {
    const docRef = await addDoc(collection(db, "events"), event);

    return {
        ...event,
        id: docRef.id
    };
};

export const getEvents = async (): Promise<CreatedEvent[]> => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map(fireBaseEventDocToEvent);

    return events as CreatedEvent[];
};

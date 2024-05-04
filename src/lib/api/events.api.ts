import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { fireBaseEventDocToEvent } from "../transformers/firebase.transformers";
import { getUser } from "./users.api";

export const createEvent = async (event: CreateEventData, user: User): Promise<CreatedEvent> => {
    const docRef = await addDoc(collection(db, "events"), { ...event, createdById: user.id });

    return {
        ...event,
        id: docRef.id,
        createdBy: user
    };
};

export const getEvents = async (): Promise<CreatedEvent[]> => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = await Promise.all(
        querySnapshot.docs.map(async doc => {
            const data = doc.data();
            const user = data.createdById ? await getUser(data.createdById) : null;
            return fireBaseEventDocToEvent(doc.id, data, user);
        })
    );

    return events as CreatedEvent[];
};

export const getEvent = async (id: string): Promise<CreatedEvent | null> => {
    const ref = doc(collection(db, "events"), id);
    const querySnapshot = await getDoc(ref);
    const data = querySnapshot.data();
    if (!data) return null;
    const createdBy = data.createdById ? await getUser(data.createdById) : null;
    const event = fireBaseEventDocToEvent(id, data, createdBy);

    return event;
};

export const getUserCreatedEvents = async (userId: string): Promise<CreatedEvent[]> => {
    const q = query(collection(db, "events"), where("createdById", "==", userId));
    const querySnapshot = await getDocs(q);
    const events = await Promise.all(
        querySnapshot.docs.map(async doc => {
            const data = doc.data();
            const user = data.createdById ? await getUser(data.createdById) : null;
            return fireBaseEventDocToEvent(doc.id, data, user);
        })
    );

    return events;
};

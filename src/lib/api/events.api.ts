import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { fireBaseEventDocToEvent } from "../transformers/firebase.transformers";
import { getUser } from "./users.api";
import { mutate } from "swr";
import { PATH_EVENT_DETAILS } from "../paths";

export const createEvent = async (event: CreateEventData, user: User): Promise<CreatedEvent> => {
    const docRef = await addDoc(collection(db, "events"), { ...event, createdById: user.id });

    return {
        ...event,
        id: docRef.id,
        createdBy: user,
        participants: []
    };
};

export const getEvents = async (categoryFilter: string | null): Promise<CreatedEvent[]> => {
    const q = categoryFilter
        ? query(collection(db, "events"), where("category", "==", categoryFilter))
        : query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
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
    const participants = await getEventParticipants(id);
    const event = fireBaseEventDocToEvent(id, data, createdBy);

    onSnapshot(ref, doc => {
        mutate(PATH_EVENT_DETAILS(id));
    });

    return { ...event, participants };
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

export const getUserBookedEvents = async (userId: string): Promise<CreatedEvent[]> => {
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    const bookedEvents: CreatedEvent[] = [];
    await Promise.all(
        querySnapshot.docs.map(async doc => {
            const participants = await getEventParticipants(doc.id);
            if (!participants.find(participant => participant.user.id === userId)) return;
            const data = doc.data();
            const user = data.createdById ? await getUser(data.createdById) : null;
            bookedEvents.push(fireBaseEventDocToEvent(doc.id, data, user));
        })
    );

    return bookedEvents;
};

export const takePartInEvent = async (eventId: string, userId: string) => {
    await addDoc(collection(db, "events", eventId, "participants"), {
        userId,
        status: "needsAction"
    });
};

export const leaveEvent = async (eventId: string, participantId: string) => {
    await deleteDoc(doc(db, "events", eventId, "participants", participantId));
};

export const deleteEvent = async (eventId: string) => {
    await deleteDoc(doc(db, "events", eventId));
};

export const getEventParticipants = async (eventId: string): Promise<Participant[]> => {
    const q = query(collection(db, "events", eventId, "participants"));
    const querySnapshot = await getDocs(q);
    const participants = await Promise.all(
        querySnapshot.docs.map(async doc => {
            const data = doc.data();
            return {
                id: doc.id,
                user: await getUser(data.userId),
                status: data.status
            } as Participant;
        })
    );

    return participants;
};

export const updateParticipant = async (
    eventId: string,
    id: string,
    data: Partial<Participant>
) => {
    const participantDoc = doc(db, "events", eventId, "participants", id);
    await updateDoc(participantDoc, data);
};

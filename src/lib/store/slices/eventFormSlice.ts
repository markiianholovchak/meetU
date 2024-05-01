import { StateCreator } from "zustand";
import { createEmptyEvent } from "../../helpers";
export type EventFormSlice = {
    isEventFormOpen: boolean;
    setIsEventFormOpen: (isOpen: boolean) => void;
    currentEventFormStep: number;
    setCurrentEventFormStep: (step: number) => void;
    resetForm: () => void;
    editedEvent: CreateEventData;
    setEditedEvent: (event?: CreatedEvent) => void;
    setEditedEventTitle: (title: string) => void;
    setEditedEventDescription: (description: string) => void;
    setEditedEventCategory: (category: string) => void;
    setEditedEventLocationType: (type: EventLocationType) => void;
    setEditedEventLocation: (location: string) => void;
    setEditedEventAccessType: (type: EventAccessType) => void;
    setEditedEventMaxParticipants: (maxParticipants: number | undefined) => void;
    setEditedEventDate: (date: Date) => void;
    setEditedEventStartTime: (time: string) => void;
    setEditedEventEndTime: (time: string) => void;
};
export const createEventFormSlice: StateCreator<EventFormSlice, [], [], EventFormSlice> = (
    set,
    get
) => ({
    isEventFormOpen: false,
    setIsEventFormOpen: isEventFormOpen => set({ isEventFormOpen }),
    currentEventFormStep: 0,
    setCurrentEventFormStep: step => set({ currentEventFormStep: step }),
    resetForm: () => {
        set({ currentEventFormStep: 0 });
    },
    editedEvent: createEmptyEvent(),
    setEditedEvent: event => {
        if (event) {
            set({ editedEvent: event, isEventFormOpen: true });
            return;
        }
        set({ editedEvent: createEmptyEvent(), isEventFormOpen: true });
    },
    setEditedEventTitle: title => {
        set({ editedEvent: { ...get().editedEvent, title } });
    },
    setEditedEventDescription: description => {
        set({ editedEvent: { ...get().editedEvent, description } });
    },
    setEditedEventCategory: category => {
        set({ editedEvent: { ...get().editedEvent, category } });
    },
    setEditedEventLocationType: locationType =>
        set({ editedEvent: { ...get().editedEvent, locationType } }),
    setEditedEventLocation: location => {
        set({ editedEvent: { ...get().editedEvent, location } });
    },
    setEditedEventAccessType: accessType => {
        set({ editedEvent: { ...get().editedEvent, accessType } });
    },
    setEditedEventMaxParticipants: maxParticipants =>
        set({ editedEvent: { ...get().editedEvent, maxParticipants } }),
    setEditedEventDate: date => set({ editedEvent: { ...get().editedEvent, date } }),
    setEditedEventStartTime: startTime => set({ editedEvent: { ...get().editedEvent, startTime } }),
    setEditedEventEndTime: endTime => set({ editedEvent: { ...get().editedEvent, endTime } })
});

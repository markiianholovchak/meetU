export const CATEGORIES = ["Sport", "Culture", "Drinks", "Science", "Clubs", "Travel"];

export const EVENT_LOCATION_TYPES: SelectItem<EventLocationType>[] = [
    {
        label: "Physical",
        value: "offline"
    },
    {
        label: "Virtual",
        value: "online"
    }
];

export const EVENT_ACCESS_TYPES: SelectItem<EventAccessType>[] = [
    {
        label: "Public",
        value: "public"
    },
    {
        label: "Private",
        value: "private"
    }
];

export const PARTICIPANT_STATUS_COLOR: Record<ParticipantStatus, string> = {
    accepted: "#34FF5F",
    declined: "#FF345E",
    needsAction: ""
};

export const PARTICIPANT_STATUS_MESSAGE: Record<ParticipantStatus, string> = {
    accepted: "Accepted",
    declined: "Rejected",
    needsAction: "Pending..."
};

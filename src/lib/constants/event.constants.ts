export const CATEGORIES = ["Sport", "Culture", "Drinks", "Science", "Clubs"];

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

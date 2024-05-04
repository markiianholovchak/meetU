type MapCoordinates = {
    lat: number;
    lng: number;
};

type EventLocationType = "online" | "offline";

type EventAccessType = "public" | "private";

type DB_ENTITY = {
    id: string;
};

type CreateEventData = {
    title: string;
    date: Date;
    locationType: EventLocationType;
    location: string;
    coordinates: MapCoordinates;
    startTime: string;
    endTime: string;
    description: string;
    coverImage: string;
    category: string;
    accessType: EventAccessType;
    maxParticipants?: number;
};

type CreatedEvent = DB_ENTITY &
    CreateEventData & {
        createdBy: User | null;
    };

type MapCoordinates = {
    lat: number;
    lng: number;
};
type CreatedEvent = {
    id: string;
    title: string;
    date: Date;
    location: string;
    coordinates: MapCoordinates;
    startTime: string;
    endTime: string;
    description: string;
    coverImage: string;
};

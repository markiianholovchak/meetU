import { GOOGLE_API_KEY } from "./constants/general.constants";

export const handleEmptyString = (title: string) => {
    if (!title.length) return "No value";
    return title;
};

export const createEmptyEvent = (): CreateEventData => {
    return {
        title: "",
        date: new Date(),
        location: "",
        coordinates: {
            lat: 0,
            lng: 0
        },
        startTime: "",
        endTime: "",
        description: "",
        coverImage: "",
        category: "",
        locationType: "offline",
        accessType: "public"
    };
};

console.log(process.env.REACT_APP_GOOGLE_API_KEY, "key");

export const coordinatesToAddress = async (coordinates: MapCoordinates) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    return data.results[0]?.formatted_address as string;
};

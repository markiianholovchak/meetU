import { EMAIL_REGEX, GOOGLE_API_KEY } from "./constants/general.constants";

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

export const coordinatesToAddress = async (coordinates: MapCoordinates) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    return data.results[0]?.formatted_address as string;
};

export const isEmailValid = (email: string) => {
    return EMAIL_REGEX.test(email);
};

export const isPasswordValid = (password: string) => {
    return password.length >= 8;
};

export const determineDeviceTypeByUserAgent = () => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );
    return {
        isMobile: mobile
    };
};

export const getAvatarUrl = (user?: User) => {
    return user?.image || "/images/avatar-placeholder.png";
};

export const getEventCoverUrl = (event: CreatedEvent) => {
    return event?.coverImage || "/images/event-cover-placeholder.jpeg";
};

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

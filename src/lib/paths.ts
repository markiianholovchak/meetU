export const PATH_HOME = "/";
export const PATH_PROFILE = "/profile";
export const PATH_EVENT_TEMPLATE = "/event/:id";
export const PATH_EVENT_DETAILS = (id: string) => "/event/" + id;
export const PATH_MY_EVENTS = "/my-events";
export const PATH_LOGIN = "/login";

export const PATH_EVENTS_SEARCH = (query: string) => `/events/search?=${query}`;

export const USER_CREATED_EVENTS = (userId: string) => `user-events/${userId}`;
export const USER_BOOKED_EVENTS = (userId: string) => `user-booked-events/${userId}`;

export const PATH_EVENT_SETTINGS_TEMPLATE = "/event-settings/:id";
export const PATH_EVENT_SETTINGS = (id: string) => "/event-settings/" + id;

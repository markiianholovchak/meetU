import useSWR, { Fetcher, SWRConfiguration } from "swr";
import { getUserBookedEvents, getUserCreatedEvents } from "../../api/events.api";
import { USER_BOOKED_EVENTS } from "../../paths";

export const useUserBookedEvents = (userId: string, options?: SWRConfiguration) => {
    const fetcher: Fetcher<CreatedEvent[], string> = async key => {
        const events = await getUserBookedEvents(userId);
        return events;
    };

    return useSWR(USER_BOOKED_EVENTS(userId), fetcher, options);
};

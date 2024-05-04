import useSWR, { Fetcher, SWRConfiguration } from "swr";
import { getUserCreatedEvents } from "../../api/events.api";
import { USER_CREATED_EVENTS } from "../../paths";

export const useUserCreatedEvents = (userId: string, options?: SWRConfiguration) => {
    const fetcher: Fetcher<CreatedEvent[], string> = async key => {
        const events = await getUserCreatedEvents(userId);
        return events;
    };

    return useSWR(USER_CREATED_EVENTS(userId), fetcher, options);
};

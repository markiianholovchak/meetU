import useSWR, { Fetcher, SWRConfiguration } from "swr";
import { getEvent } from "../../api/events.api";
import { PATH_EVENT_DETAILS } from "../../paths";

export const useEventDetails = (eventId?: string, options?: SWRConfiguration) => {
    const fetcher: Fetcher<CreatedEvent | null, string> = async key => {
        if (!eventId) return null;
        const events = await getEvent(eventId);
        return events;
    };

    return useSWR(eventId ? PATH_EVENT_DETAILS(eventId) : null, fetcher, options);
};

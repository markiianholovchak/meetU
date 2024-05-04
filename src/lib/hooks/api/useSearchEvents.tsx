import useSWR, { Fetcher, SWRConfiguration } from "swr";
import { getEvents } from "../../api/events.api";
import { PATH_EVENTS_SEARCH } from "../../paths";

export const useSearchEvents = (query: string, options?: SWRConfiguration) => {
    const fetcher: Fetcher<CreatedEvent[] | null, string[]> = async key => {
        const events = await getEvents();
        console.log(events);
        return events;
    };

    return useSWR([PATH_EVENTS_SEARCH("")], fetcher, options);
};

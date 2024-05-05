import { useEventDetails } from "../lib/hooks/api/useEventDetails";
import { EventHeader } from "./UI/EventHeader";
import { Map } from "./Map";
import { EventSummary, TakePartButton } from "./EventSummary";
import { getAvatarUrl } from "../lib/helpers";

type EventDetailsProps = {
    eventId: string;
};
export const EventDetails = ({ eventId }: EventDetailsProps) => {
    const { data: event } = useEventDetails(eventId);

    console.log(event, eventId);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <EventHeader title={event.title} />
            <div className="mt-6 flex flex-col gap-4">
                <EventSummary event={event} />
                {event.createdBy && (
                    <div>
                        <p className="text-sm font-medium">Organizer:</p>
                        <div className="mt-2 flex items-center gap-2">
                            <img
                                src={getAvatarUrl(event.createdBy)}
                                alt="Avatar"
                                className="h-8 w-8 rounded-full border-border"
                            />
                            <div>
                                <p className="text-sm font-medium">{event.createdBy.name}</p>
                                {/* <p className="text-xs text-gray-100 opacity-50">
                                    25 organized Events
                                </p> */}
                            </div>
                        </div>
                    </div>
                )}
                {!!event.coordinates.lat && (
                    <div className="relative h-[350px] w-full">
                        <Map markers={[event.coordinates]} />
                    </div>
                )}

                <TakePartButton event={event} />
            </div>
        </>
    );
};

import { useParams } from "react-router-dom";
import { Map } from "../components/Map";
import { useEventDetails } from "../lib/hooks/api/useEventDetails";
import { EventSummary, TakePartButton } from "../components/EventSummary";
import { EventHeader } from "../components/UI/EventHeader";

export const EventDetails = () => {
    const { id } = useParams();

    const { data: event } = useEventDetails(id);

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <EventHeader title={event.title} />
            <div className="mt-6 flex flex-col gap-4">
                <EventSummary event={event} />
                {event.createdBy && (
                    <div>
                        <p className="text-sm font-medium">Organizer:</p>
                        <div className="mt-2 flex items-center gap-2">
                            <img
                                src={event.createdBy.image || ""}
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

                <div className="relative h-[350px] w-full">
                    <Map markers={[event.coordinates]} />
                </div>
                <TakePartButton event={event} />
            </div>
        </div>
    );
};

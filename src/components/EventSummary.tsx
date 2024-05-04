import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { leaveEvent, takePartInEvent } from "../lib/api/events.api";
import { PATH_EVENT_DETAILS } from "../lib/paths";
import { useMainStore } from "../lib/store/store";
import { Button } from "./UI/Button";

type TakePartButtonProps = {
    event: CreatedEvent;
};

export const TakePartButton = ({ event }: TakePartButtonProps) => {
    const user = useMainStore(state => state.user)!;
    const userParticipant = event.participants.find(participant => participant.user.id === user.id);
    const hasUserJoinedEvent = !!userParticipant;

    const { mutate } = useSWRConfig();

    const handleLeaveEvent = async () => {
        if (!userParticipant) return;
        await leaveEvent(event.id, userParticipant.id);
        mutate(PATH_EVENT_DETAILS(event.id));
    };

    const takePart = async () => {
        await takePartInEvent(event.id, user.id);
        mutate(PATH_EVENT_DETAILS(event.id));
    };

    return (
        <>
            {hasUserJoinedEvent ? (
                <Button
                    variant="outlined"
                    className="px-2 py-1 text-xs font-medium"
                    onClick={handleLeaveEvent}
                    disabled={!hasUserJoinedEvent}
                >
                    Leave event
                </Button>
            ) : (
                <Button
                    variant="primary"
                    className="px-2 py-1 text-xs font-medium"
                    onClick={takePart}
                    disabled={hasUserJoinedEvent}
                >
                    {hasUserJoinedEvent ? "Joined" : "Take part"}
                </Button>
            )}
        </>
    );
};

type EventSummaryProps = {
    event: CreatedEvent;
    isAdminPage?: boolean;
};
export const EventSummary = ({ event, isAdminPage }: EventSummaryProps) => {
    const placesLeft = event.maxParticipants
        ? event.maxParticipants - event.participants.length
        : null;
    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-[250px] ">
                <img
                    src={event.coverImage}
                    className=" h-full w-full rounded-xl object-cover object-center shadow-inner"
                    alt="Event cover"
                />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-gray-100 opacity-50">{event.location}</p>
                </div>
                {!isAdminPage && <TakePartButton event={event} />}
            </div>
            <div className="flex gap-6">
                <div>
                    <p className="text-sm font-medium">{dayjs(event.date).format("DD")}</p>
                    <p className="text-xs text-gray-100 opacity-50">
                        {dayjs(event.date).format("MMMM, YYYY")}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium">{dayjs(event.date).format("dddd")}</p>
                    <p className="text-xs text-gray-100 opacity-50">
                        {event.startTime} - {event.endTime}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium">{placesLeft || "Unlimited"}</p>
                    <p className="text-xs text-gray-100 opacity-50">Places left</p>
                </div>
            </div>

            <p className="text-sm text-gray-100 ">
                <span className="font-medium text-white opacity-100">About this event:</span>{" "}
                <span className="text-gray-100 opacity-50">{event.description}</span>
            </p>
        </div>
    );
};

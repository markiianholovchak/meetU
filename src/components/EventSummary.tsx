import dayjs from "dayjs";
import { leaveEvent, takePartInEvent } from "../lib/api/events.api";
import { PATH_EVENT_SETTINGS, PATH_LOGIN } from "../lib/paths";
import { useMainStore } from "../lib/store/store";
import { Button } from "./UI/Button";
import { Link, useNavigate } from "react-router-dom";
import useDeviceType from "../lib/hooks/useDeviceType";
import {
    PARTICIPANT_STATUS_COLOR,
    PARTICIPANT_STATUS_MESSAGE
} from "../lib/constants/event.constants";
import { getEventCoverUrl } from "../lib/helpers";

type TakePartButtonProps = {
    event: CreatedEvent;
};

export const TakePartButton = ({ event }: TakePartButtonProps) => {
    const user = useMainStore(state => state.user);
    const setSelectedEvent = useMainStore(state => state.setSelectedEvent);
    const { isMobile } = useDeviceType();
    const navigate = useNavigate();

    if (!user)
        return (
            <Link
                to={PATH_LOGIN}
                onClick={() => setSelectedEvent(null)}
                className="rounded-md bg-crimson px-2 py-1 text-center text-sm"
            >
                Log in
            </Link>
        );

    if (event.accessType === "private") return null;

    const userParticipant = event.participants.find(participant => participant.user.id === user.id);
    const isUserOwner = event.createdBy?.id === user.id;
    const hasUserJoinedEvent = !!userParticipant;

    const placesLeft = event.maxParticipants
        ? event.maxParticipants - event.participants.length
        : null;

    const handleLeaveEvent = async () => {
        if (!userParticipant) return;
        await leaveEvent(event.id, userParticipant.id);
    };

    const takePart = async () => {
        if (placesLeft && placesLeft <= 0) return;
        await takePartInEvent(event.id, user.id);
    };

    const handleManage = () => {
        if (isMobile) {
            navigate(PATH_EVENT_SETTINGS(event.id));
            return;
        }
        setSelectedEvent({
            id: event.id,
            mode: "manage"
        });
    };

    if (isUserOwner) {
        return (
            <Button className="text-xs" onClick={handleManage}>
                Manage
            </Button>
        );
    }
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
    const user = useMainStore(state => state.user);
    const placesLeft = event.maxParticipants
        ? event.maxParticipants - event.participants.length
        : null;

    const userParticipant = event.participants.find(
        participant => participant.user.id === user?.id
    );
    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-[250px] ">
                <img
                    src={getEventCoverUrl(event)}
                    className=" h-full w-full rounded-xl object-cover object-center shadow-inner"
                    alt="Event cover"
                />
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="overflow-hidden">
                    <p className="font-medium">{event.title}</p>
                    <p className=" truncate text-gray-100 opacity-50">{event.location}</p>
                </div>
                {!isAdminPage && (
                    <div className="flex-shrink-0">
                        <TakePartButton event={event} />
                    </div>
                )}
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

            <p className="flex gap-2 text-sm text-gray-100 ">
                <span className="font-medium text-white opacity-100">
                    {event.locationType === "online" ? "Online location" : "Address"}{" "}
                </span>
                <span className="text-gray-100 opacity-50">{event.location}</span>
            </p>

            {userParticipant && (
                <p className="flex gap-2 text-sm text-gray-100 ">
                    <span className="font-medium text-white opacity-100">
                        Participation status:
                    </span>
                    <span
                        className="t0"
                        style={{
                            color: PARTICIPANT_STATUS_COLOR[userParticipant.status]
                        }}
                    >
                        {PARTICIPANT_STATUS_MESSAGE[userParticipant.status]}
                    </span>
                </p>
            )}
        </div>
    );
};

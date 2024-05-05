import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";
import { updateParticipant, deleteEvent, leaveEvent } from "../lib/api/events.api";
import { useEventDetails } from "../lib/hooks/api/useEventDetails";
import { PATH_EVENT_DETAILS, PATH_MY_EVENTS, USER_CREATED_EVENTS } from "../lib/paths";
import { EventSummary } from "./EventSummary";
import { Button } from "./UI/Button";
import { EventHeader } from "./UI/EventHeader";
import { useMainStore } from "../lib/store/store";
import { getAvatarUrl } from "../lib/helpers";
import { useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";
type ParticipantItemProps = {
    eventId: string;
    participant: Participant;
};
const ParticipantItem = ({ participant, eventId }: ParticipantItemProps) => {
    const { mutate } = useSWRConfig();
    const changeParticipantStatus = async (status: ParticipantStatus) => {
        await updateParticipant(eventId, participant.id, {
            status
        });
        mutate(PATH_EVENT_DETAILS(eventId));
    };
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img
                    className="h-10 w-10 rounded-full border border-darkGray"
                    src={getAvatarUrl(participant.user)}
                    alt="Participant avatar "
                />
                <p>{participant.user.name || participant.user.email}</p>
            </div>
            <div className="flex items-center gap-2">
                {participant.status === "accepted" && (
                    <Button variant="primary" className="text-xs" disabled>
                        Accepted
                    </Button>
                )}
                {participant.status === "declined" && (
                    <Button variant="outlined" className="text-xs" disabled>
                        Declined
                    </Button>
                )}
                {participant.status === "needsAction" && (
                    <>
                        <Button
                            variant="primary"
                            className="text-xs"
                            onClick={() => changeParticipantStatus("accepted")}
                        >
                            Accept
                        </Button>
                        <Button
                            variant="outlined"
                            className="text-xs"
                            onClick={() => changeParticipantStatus("declined")}
                        >
                            Decline
                        </Button>
                    </>
                )}
                <Button
                    variant="unstyled"
                    onClick={() => {
                        leaveEvent(eventId, participant.id);
                    }}
                >
                    <FaTrashCan />
                </Button>
            </div>
        </div>
    );
};

type EventSettingsProps = {
    eventId: string;
};
export const EventSettings = ({ eventId }: EventSettingsProps) => {
    const setSelectedEvent = useMainStore(state => state.setSelectedEvent);
    const user = useMainStore(state => state.user)!;
    const { data: event } = useEventDetails(eventId);
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (!event?.participants.length) return;

        navigator.vibrate(200);
    }, [event?.participants.length]);

    if (!event) return <div>Loading...</div>;

    const handleDelete = async () => {
        setSelectedEvent(null);
        await deleteEvent(event.id);
        mutate(USER_CREATED_EVENTS(user.id));
        navigate(PATH_MY_EVENTS);
    };

    return (
        <>
            <EventHeader title={event.title} />
            <div className="mt-6">
                <EventSummary event={event} isAdminPage />
            </div>
            <div>
                <p className="mb-2 text-sm  ">Participants:</p>
                <div>
                    {event.participants.map(participant => {
                        return (
                            <ParticipantItem
                                key={participant.id}
                                participant={participant}
                                eventId={event.id}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center">
                <Button variant="unstyled" className="text-crimson" onClick={handleDelete}>
                    Delete event
                </Button>
            </div>
        </>
    );
};

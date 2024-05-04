import { useNavigate, useParams } from "react-router-dom";
import { EventSummary } from "../components/EventSummary";
import { useEventDetails } from "../lib/hooks/api/useEventDetails";
import { Button } from "../components/UI/Button";
import { deleteEvent, updateParticipant } from "../lib/api/events.api";
import { useSWRConfig } from "swr";
import { PATH_EVENT_DETAILS, PATH_MY_EVENTS } from "../lib/paths";
import { EventHeader } from "../components/UI/EventHeader";

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
                    src={participant.user.image || ""}
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
            </div>
        </div>
    );
};

export const EventSettings = () => {
    const { id } = useParams();

    const { data: event } = useEventDetails(id);
    const navigate = useNavigate();

    if (!event) return <div>Loading...</div>;

    const handleDelete = async () => {
        await deleteEvent(event.id);
        navigate(PATH_MY_EVENTS);
    };

    return (
        <div className="flex flex-col gap-4">
            <EventHeader title={event.title} />
            <EventSummary event={event} isAdminPage />
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
        </div>
    );
};

import { useParams } from "react-router-dom";

import { EventDetails } from "../components/EventDetails";

export const EventDetailsPage = () => {
    const { id } = useParams();

    if (!id) return null;

    return (
        <div>
            <EventDetails eventId={id} />
        </div>
    );
};

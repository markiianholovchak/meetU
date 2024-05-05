import { useParams } from "react-router-dom";
import { EventSettings } from "../components/EventSettings";

export const EventSettingsPage = () => {
    const { id } = useParams();

    if (!id) return null;

    return (
        <div className="flex flex-col gap-4">
            <EventSettings eventId={id} />
        </div>
    );
};

import { FaPlus } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { useMainStore } from "../lib/store/store";
import { EventFormModal } from "../components/EventForm";
import { useUserCreatedEvents } from "../lib/hooks/api/useUserCreatedEvents";
import { EventCard } from "../components/EventCard";

export const MyEvents = () => {
    const addEvent = useMainStore(state => state.setEditedEvent);
    const user = useMainStore(state => state.user)!;

    const { data } = useUserCreatedEvents(user.id);

    return (
        <div>
            My events!
            <Navbar />
            <div
                className="fixed bottom-14 right-4 rounded-full bg-crimson bg-opacity-75 p-4"
                onClick={() => addEvent()}
            >
                <FaPlus />
            </div>
            <div className="mb-8 flex flex-col gap-4">
                {data?.map(event => {
                    return <EventCard key={event.id} event={event} />;
                })}
            </div>
            <EventFormModal />
        </div>
    );
};

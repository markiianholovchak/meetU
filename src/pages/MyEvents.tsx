import { FaPlus } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { useMainStore } from "../lib/store/store";
import { EventFormModal } from "../components/EventForm";

export const MyEvents = () => {
    const addEvent = useMainStore(state => state.setEditedEvent);
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
            <EventFormModal />
        </div>
    );
};

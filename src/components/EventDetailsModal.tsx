import { useMainStore } from "../lib/store/store";
import Modal from "./UI/Modal";
import { EventDetails } from "./EventDetails";
import { EventSettings } from "./EventSettings";

export const EventDetailsModal = () => {
    const selectedEvent = useMainStore(state => state.selectedEvent);
    const setSelectedEvent = useMainStore(state => state.setSelectedEvent);

    const closeModal = () => {
        setSelectedEvent(null);
    };

    if (!selectedEvent)
        return (
            <Modal isOpen={!!selectedEvent} onClose={closeModal} onOpen={() => {}}>
                {" "}
                <div>Loading...</div>{" "}
            </Modal>
        );
    return (
        <Modal isOpen={!!selectedEvent} onClose={closeModal} onOpen={() => {}}>
            <div className="h-[80vh] w-[550px] overflow-auto rounded-lg border border-gray-700 p-4">
                {selectedEvent.mode === "view" ? (
                    <EventDetails eventId={selectedEvent.id} />
                ) : (
                    <EventSettings eventId={selectedEvent.id} />
                )}
            </div>
        </Modal>
    );
};

import { FaChevronDown, FaPlus } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { useMainStore } from "../lib/store/store";
import { EventFormModal } from "../components/EventForm";
import { useUserCreatedEvents } from "../lib/hooks/api/useUserCreatedEvents";
import { EventCard } from "../components/EventCard";
import { useUserBookedEvents } from "../lib/hooks/api/useUserBookedEvents";
import { PropsWithChildren } from "react";
import { useDisclosure } from "../lib/hooks/useDisclosure";

type EventsAccordeonProps = PropsWithChildren & {
    title: string;
};
const EventsAccordeon = ({ title, children }: EventsAccordeonProps) => {
    const disclosure = useDisclosure();
    return (
        <div>
            <div className="flex items-center gap-2 text-crimson" onClick={disclosure.onToggle}>
                <p>{title}</p>
                <div>
                    <FaChevronDown
                        className={`h-5 w-5 rounded-md border border-crimson  p-1 ${disclosure.isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>
            {disclosure.isOpen && children}
        </div>
    );
};

export const MyEvents = () => {
    const addEvent = useMainStore(state => state.setEditedEvent);
    const user = useMainStore(state => state.user)!;

    const { data } = useUserCreatedEvents(user.id);
    const { data: bookedEvents } = useUserBookedEvents(user.id);

    return (
        <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">Events</p>
            <Navbar />
            <div
                className="fixed bottom-14 right-4 rounded-full bg-crimson bg-opacity-75 p-4"
                onClick={() => addEvent()}
            >
                <FaPlus />
            </div>

            <EventsAccordeon title={`(${data?.length}) Your events`}>
                <div className="mb-8 flex flex-col gap-4">
                    {data?.map(event => {
                        return <EventCard key={event.id} event={event} withAdminPanel />;
                    })}
                </div>
            </EventsAccordeon>
            <EventsAccordeon title={`(${bookedEvents?.length}) Booked events`}>
                <div className="mb-8 flex flex-col gap-4">
                    {bookedEvents?.map(event => {
                        return <EventCard key={event.id} event={event} />;
                    })}
                </div>
            </EventsAccordeon>

            <EventFormModal />
        </div>
    );
};

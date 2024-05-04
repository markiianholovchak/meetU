import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock, FaTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useMainStore } from "../lib/store/store";
import { deleteEvent } from "../lib/api/events.api";
import { useSWRConfig } from "swr";
import { PATH_EVENT_SETTINGS, USER_CREATED_EVENTS } from "../lib/paths";
import { MouseEvent } from "react";

type AdminPanelProps = {
    event: CreatedEvent;
};
const AdminPanel = ({ event }: AdminPanelProps) => {
    const user = useMainStore(state => state.user);
    const { mutate } = useSWRConfig();

    const isOwner = event.createdBy?.id === user?.id;
    if (!isOwner) return <></>;

    const handleDelete = async (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        if (!user || !isOwner) return;

        await deleteEvent(event.id);
        mutate(USER_CREATED_EVENTS(user.id));
    };

    return (
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
            <Link to={PATH_EVENT_SETTINGS(event.id)}>
                <p className="text-xs">Manage</p>
            </Link>
            <FaTrashCan onClick={handleDelete} />
        </div>
    );
};

type EventCardProps = {
    event: CreatedEvent;
    withAdminPanel?: boolean;
};

export const EventCard = ({ event, withAdminPanel }: EventCardProps) => {
    const navigate = useNavigate();

    const goToEventPage = () => {
        navigate(`/event/${event.id}`);
    };

    return (
        <div className=" relative h-[160px] w-full cursor-pointer " onClick={goToEventPage}>
            <img
                src={event.coverImage}
                className="absolute bottom-0 left-0 right-0 top-0 z-[-1] h-full w-full rounded-xl object-cover object-center"
                alt="Event cover"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] rounded-xl bg-black opacity-40"></div>

            <div className="z-10 flex h-full flex-col justify-between px-3 py-2 ">
                <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center  gap-1">
                        <IoCalendarOutline />
                        <p className=" text-xs">{dayjs(event.date).format("DD MMM YYYY")} </p>
                    </div>
                    {withAdminPanel && <AdminPanel event={event} />}
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="font-semibold">{event.title}</p>
                        <div className="flex items-center gap-1 ">
                            <IoLocationOutline />
                            <p className="text-xs">
                                {event.locationType === "offline" ? event.location : "Online"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegClock />
                        <p className="text-xs">
                            {!event.startTime && !event.endTime
                                ? "All day"
                                : `${event.startTime || "00:00"} - ${event.endTime || "00:00"}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
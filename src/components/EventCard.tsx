import { IoCalendarOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

type EventCardProps = {
    event: CreatedEvent;
};
export const EventCard = ({ event }: EventCardProps) => {
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
                <div className="flex items-center gap-1">
                    <IoCalendarOutline />
                    <p className=" text-xs">{dayjs(event.date).format("DD MMM YYYY")} </p>
                </div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="font-semibold">{event.title}</p>
                        <div className="flex items-center gap-1 ">
                            <IoLocationOutline />
                            <p className="text-xs">{event.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegClock />
                        <p className="text-xs">
                            {event.startTime} - {event.endTime}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

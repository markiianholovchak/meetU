import { FaChevronLeft } from "react-icons/fa";
import { MOCK_EVENT } from "../lib/constants/mock";
import { Button } from "../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import dayjs from "dayjs";
import { Map } from "../components/Map";

export const EventDetails = () => {
    const event = MOCK_EVENT;
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex items-center justify-between">
                <Button
                    variant="unstyled"
                    className="rounded-md border border-border p-2"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <FaChevronLeft className="h-6 w-6" />
                </Button>
                <p className="text-2xl font-medium">{event.title}</p>

                <div className="w-max rounded-full border border-border p-2">
                    <Link to={"/profile"} className=" ">
                        <FaRegUser className="h-6 w-6 fill-current" />
                    </Link>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <div className="relative h-[250px] ">
                    <img
                        src={event.coverImage}
                        className=" h-full w-full rounded-xl object-cover object-center shadow-inner"
                        alt="Event cover"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-gray-100 opacity-50">{event.location}</p>
                    </div>
                    <Button variant="primary" className="px-2 py-1 text-xs font-medium">
                        Take part
                    </Button>
                </div>
                <div className="flex gap-6">
                    <div>
                        <p className="text-sm font-medium">{dayjs(event.date).format("DD")}</p>
                        <p className="text-xs text-gray-100 opacity-50">
                            {dayjs(event.date).format("MMMM, YYYY")}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">{dayjs(event.date).format("dddd")}</p>
                        <p className="text-xs text-gray-100 opacity-50">
                            {event.startTime} - {event.endTime}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">4</p>
                        <p className="text-xs text-gray-100 opacity-50">Places left</p>
                    </div>
                </div>

                <p className="text-sm text-gray-100 ">
                    <span className="font-medium text-white opacity-100">About this event:</span>{" "}
                    <span className="text-gray-100 opacity-50">{event.description}</span>
                </p>

                <div>
                    <p className="text-sm font-medium">Organizer:</p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="w-max rounded-full border border-border p-2">AV</div>
                        <div>
                            <p className="text-sm font-medium">Party animals LLC</p>
                            <p className="text-xs text-gray-100 opacity-50">25 organized Events</p>
                        </div>
                    </div>
                </div>
                <div className="relative h-[350px] w-full">
                    <Map markers={[event.coordinates]} />
                </div>
                <Button variant="primary" className="text-sm">
                    Join event
                </Button>
            </div>
        </div>
    );
};

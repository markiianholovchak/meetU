import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import useDeviceType from "../../lib/hooks/useDeviceType";
import { useMainStore } from "../../lib/store/store";

type EventHeaderProps = {
    title: string;
};
export const EventHeader = ({ title }: EventHeaderProps) => {
    const navigate = useNavigate();
    const { isMobile } = useDeviceType();
    const setSelectedEvent = useMainStore(state => state.setSelectedEvent);
    return (
        <div className="flex items-center justify-between">
            {isMobile ? (
                <Button
                    variant="unstyled"
                    className="rounded-md border border-border p-2"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <FaChevronLeft className="h-6 w-6" />
                </Button>
            ) : (
                <div className="h-6 w-6" />
            )}

            <p className="text-2xl font-medium">{title}</p>

            <div className="w-max rounded-full border border-border p-2">
                <Link to={"/profile"} onClick={() => setSelectedEvent(null)}>
                    <FaRegUser className="h-6 w-6 fill-current" />
                </Link>
            </div>
        </div>
    );
};

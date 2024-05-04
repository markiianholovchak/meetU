import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

type EventHeaderProps = {
    title: string;
};
export const EventHeader = ({ title }: EventHeaderProps) => {
    const navigate = useNavigate();
    return (
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
            <p className="text-2xl font-medium">{title}</p>

            <div className="w-max rounded-full border border-border p-2">
                <Link to={"/profile"} className=" ">
                    <FaRegUser className="h-6 w-6 fill-current" />
                </Link>
            </div>
        </div>
    );
};

import { IoIosSearch } from "react-icons/io";
import { LuTicket } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";
import { PATH_HOME, PATH_MY_EVENTS, PATH_PROFILE } from "../lib/paths";

type NavbarButtonProps = PropsWithChildren & {
    link: string;
};
const NavbarButton = ({ link, children }: NavbarButtonProps) => {
    const location = useLocation();
    const isActive = location.pathname === link;
    return (
        <Link to={link}>
            <div className={`flex h-8 w-8 items-center gap-2 ${isActive ? " text-crimson" : ""}`}>
                {children}
            </div>
        </Link>
    );
};

export const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gray-900 bg-opacity-70 py-2 backdrop-blur backdrop-filter">
            <div className="flex w-max items-center gap-12">
                <NavbarButton link={PATH_HOME}>
                    <IoIosSearch className="h-full w-full fill-current" />
                </NavbarButton>
                <NavbarButton link={PATH_MY_EVENTS}>
                    <LuTicket className="h-full w-full stroke-current" />
                </NavbarButton>
                <NavbarButton link={PATH_PROFILE}>
                    <FaRegUser className="h-full w-full fill-current" />
                </NavbarButton>
            </div>
        </div>
    );
};

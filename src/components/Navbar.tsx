import { IoIosSearch } from "react-icons/io";
import { LuTicket } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

type NavbarButtonProps = PropsWithChildren & {
    link: string;
};
const NavbarButton = ({ link, children }: NavbarButtonProps) => {
    const location = useLocation();
    const isActive = location.pathname === link;
    return (
        <Link to={link}>
            <div className={`flex h-9 w-9 items-center gap-2 ${isActive ? " text-crimson" : ""}`}>
                {children}
            </div>
        </Link>
    );
};

export const Navbar = () => {
    const location = useLocation();
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center py-2">
            <div className="flex w-max items-center gap-12">
                <NavbarButton link="/">
                    <IoIosSearch className="h-full w-full fill-current" />
                </NavbarButton>
                <NavbarButton link="/user-events">
                    <LuTicket className="h-full w-full stroke-current" />
                </NavbarButton>
                <NavbarButton link="/profile">
                    <FaRegUser className="h-full w-full fill-current" />
                </NavbarButton>
            </div>
        </div>
    );
};

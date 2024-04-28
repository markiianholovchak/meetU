import { PropsWithChildren, useEffect } from "react";
import { useMainStore } from "../lib/store/store";
import { useNavigate } from "react-router-dom";

type RequiresAuthProps = PropsWithChildren;
export const RequiresAuth = ({ children }: RequiresAuthProps) => {
    const user = useMainStore(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        !user && navigate("/login");
    }, [user]);

    if (user) return <>{children}</>;
    return null;
};

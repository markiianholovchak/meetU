import { useMainStore } from "../lib/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signInWithGoogle } from "../lib/auth";

export const LoginPage = () => {
    const navigate = useNavigate();
    const user = useMainStore(state => state.user);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with google</button>
        </div>
    );
};

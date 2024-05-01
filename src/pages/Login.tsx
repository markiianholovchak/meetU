import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../lib/store/store";
import { signInWithGoogle, signInWithEmail as firebaseSignInWithEmail } from "../lib/auth";
import { User } from "firebase/auth";

export const LoginPage = () => {
    const navigate = useNavigate();
    const user = useMainStore(state => state.user);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    // add a way to provide the data
    return (
        <div>
            <button onClick={() => firebaseSignInWithEmail('test4@galax.dev', 'test1234')}>Sign in with Email</button>
            <p>or</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

import { useEffect, useState } from "react";
import { Input } from "../components/UI/Input";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../lib/store/store";
import { signInWithGoogle, signInWithEmail as firebaseSignInWithEmail } from "../lib/auth";
import { User } from "firebase/auth";

export const LoginPage = () => {
    const navigate = useNavigate();
    const user = useMainStore(state => state.user);
    const [email, setEmail] = useState("test4@galax.dev");
    const [password, setPassword] = useState("test1234");
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    // add a way to provide the data
    return (
        <div>
                <Input
                    value={email}
                    onChange={(newValue) => setEmail(newValue)}
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                />
                <Input
                    value={password}
                    onChange={(newValue) => setPassword(newValue)}
                    label="Password"
                    type="text"
                    placeholder="Password"
                />
            <button onClick={() => firebaseSignInWithEmail(email,password)}>Sign in with Email</button>
            <p>or</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

import { useMainStore } from "../lib/store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { PATH_HOME, PATH_LOGIN } from "../lib/paths";
import { isEmailValid, isPasswordValid } from "../lib/helpers";
import { signUpWithEmailAndPassword } from "../lib/auth";
import { FormErrorField } from "../components/UI/FormErrorField";
import { FirebaseError } from "firebase/app";

const FirebaseAuthErrorMessages: Record<string, string> = {
    "auth/email-already-in-use": "Email already taken"
};

export const RegisterPage = () => {
    const navigate = useNavigate();
    const user = useMainStore(state => state.user);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = username.trim().length && isEmailValid(email) && password.trim().length;

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (!isEmailValid(email)) {
            setError("Email is not valid");
            return;
        }
        if (!isPasswordValid(password)) {
            setError("Password should be at least 8 characters, have a number and a upper letter");
            return;
        }

        try {
            await signUpWithEmailAndPassword(email, password, username);
            navigate(PATH_HOME);
        } catch (err) {
            if (err instanceof FirebaseError) {
                setError(FirebaseAuthErrorMessages[err.code] || "");

                return;
            }
            setError("Unknown error occured. Try again later");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="flex flex-col gap-6">
            <p className="text-center text-2xl font-semibold">meetU</p>
            <form onSubmit={signUp}>
                <div className="flex flex-col gap-4">
                    <Input
                        required
                        label="Username"
                        type="text"
                        value={username}
                        onChange={setUsername}
                        placeholder="email@meetu.com"
                    />
                    <Input
                        required
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="email@meetu.com"
                    />
                    <Input
                        required
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="*********"
                    />
                    {error && <FormErrorField error={error} />}
                    <Button disabled={!isFormValid || isLoading} type="submit">
                        Sign up
                    </Button>
                    <div>
                        <p className="text-xs text-gray-100 opacity-50">
                            Already have an account?{" "}
                            <Link className=" underline" to={PATH_LOGIN}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

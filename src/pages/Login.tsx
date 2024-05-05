import { useMainStore } from "../lib/store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../lib/auth";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { IconGoogle } from "../lib/assets/icons";
import { PATH_REGISTER } from "../lib/paths";
import { FormErrorField } from "../components/UI/FormErrorField";
import { AuthPageLayout } from "../components/UI/AuthPageLayout";

export const LoginPage = () => {
    const navigate = useNavigate();
    const user = useMainStore(state => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <AuthPageLayout>
            <div className="flex flex-col gap-4">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={async e => {
                        e.preventDefault();
                        const success = await logInWithEmailAndPassword(email, password);
                        if (success) {
                            navigate("/");
                        } else {
                            setError("Invalid email or password");
                        }
                    }}
                >
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="email@meetu.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="*********"
                    />
                    {error && <FormErrorField error={error} />}
                    <Button type="submit">Log in</Button>
                </form>
                <div>
                    <p className="text-xs text-gray-100 opacity-50">
                        Don't have an account?{" "}
                        <Link className=" underline" to={PATH_REGISTER}>
                            Sign up
                        </Link>
                    </p>
                </div>
                <div className="flex items-center justify-center gap-4 px-4">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <p className="text-gray-100 opacity-50">or continue with</p>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>
                <button
                    onClick={signInWithGoogle}
                    className="flex items-center justify-center  gap-2 rounded-lg bg-gray-100 py-2 text-gray-900"
                >
                    <IconGoogle />
                    Google
                </button>
            </div>
        </AuthPageLayout>
    );
};

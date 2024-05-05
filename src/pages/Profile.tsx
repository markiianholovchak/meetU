import { useState } from "react";
import { useMainStore } from "../lib/store/store";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { logOut } from "../lib/auth";
import { Navbar } from "../components/Navbar";

export const ProfilePage = () => {
    const user = useMainStore(state => state.user) as User;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const isFormDisabled = user.provider === "google.com";
    return (
        <div className="gap4- flex flex-col gap-4">
            <p className="text-center text-2xl text-primaryText">Profile information</p>
            <form className="flex flex-col gap-4">
                <Input
                    value={name || ""}
                    onChange={setName}
                    disabled={isFormDisabled}
                    label="Name"
                    type="text"
                    placeholder="Name and Surname"
                />
                <Input
                    value={email || ""}
                    disabled={isFormDisabled}
                    onChange={setEmail}
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                />
                <Button variant="primary" disabled={isFormDisabled}>
                    Save
                </Button>
                <Button variant="outlined" onClick={logOut}>
                    Log out
                </Button>
            </form>
            <Navbar />
        </div>
    );
};

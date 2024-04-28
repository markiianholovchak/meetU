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
    // TODO: disable form if the provider is google
    return (
        <div className="gap4- flex flex-col gap-4">
            <p className="text-primaryText text-center text-2xl">Profile information</p>
            <form className="flex flex-col gap-4">
                <Input
                    value={name || ""}
                    onChange={setName}
                    label="Name"
                    type="text"
                    placeholder="Name and Surname"
                />
                <Input
                    value={email || ""}
                    onChange={setEmail}
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                />
                <Button variant="primary">Save</Button>
                <Button variant="outlined" onClick={logOut}>
                    Log out
                </Button>
            </form>
            <Navbar />
        </div>
    );
};

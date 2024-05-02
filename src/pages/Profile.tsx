import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../lib/store/store";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { logOut, updateProfile, getUserData } from "../lib/auth";
import { Navbar } from "../components/Navbar";
import { getAuth, updateEmail, updateProfile as firebaseUpdateProfile } from "firebase/auth";

export const ProfilePage = () => {
    const user = useMainStore(state => state.user) as User;
    const [name, setName] = useState<string>(user.name || '');
    const [email, setEmail] = useState<string>(user.email || '');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleUpdate = async () => {
        if (!name || !email) {
            alert("Name and email cannot be empty.");
            return;
        }
        try {
//          await firebaseUpdateProfile(user, { displayName: name });
            await getUserData(user.id);
            await updateProfile(user.id, { name, email });
            console.log(user,user.id, name, email)
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <p className="text-primaryText text-center text-2xl">Profile Information</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => {
            e.preventDefault();
             handleUpdate(); }}>
                <Input
                    value={name}
                    onChange={(newValue) => setName(newValue)}
                    label="Name"
                    type="text"
                    placeholder="Name and Surname"
                    disabled={isDisabled}
                />
                <Input
                    value={email}
                    onChange={(newValue) => setEmail(newValue)}
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    disabled={isDisabled}
                />
                <Button variant="primary" type="submit" disabled={isDisabled}>Save</Button>
                <Button variant="outlined" onClick={logOut}>Log out</Button>
            </form>
            <Navbar />
        </div>
    );
};

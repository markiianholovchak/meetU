import { useRef, useState } from "react";
import { useMainStore } from "../lib/store/store";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { logOut, updateSessionUser } from "../lib/auth";
import { Navbar } from "../components/Navbar";
import { AuthPageLayout } from "../components/UI/AuthPageLayout";
import { uploadFileToStorage } from "../lib/api/storage.api";
import { updateUser } from "../lib/api/users.api";
import { getAvatarUrl } from "../lib/helpers";

export const ProfilePage = () => {
    const user = useMainStore(state => state.user) as User;
    const setUser = useMainStore(state => state.setUser);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const isFormDisabled = user.provider === "google.com";
    const photoInputRef = useRef<HTMLInputElement>(null);

    const onEditPhoto = () => {
        photoInputRef?.current?.click();
    };

    const handleChangeImage = async (file: File | null) => {
        setCoverImage(file);
        if (file) {
            const path = await uploadFileToStorage(file);
            await updateUser(user.id, { image: path });
            const updatedUser: User = {
                ...user,
                image: path
            };
            setUser(updatedUser);
            updateSessionUser(updatedUser);
        }
    };

    console.log(coverImage);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser(user.id, { name });
        const updatedUser: User = {
            ...user,
            name
        };
        setUser(updatedUser);
        updateSessionUser(updatedUser);
    };
    return (
        <AuthPageLayout>
            <div className="flex flex-col gap-4">
                <p className="text-center text-2xl text-primaryText">Profile information</p>
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={getAvatarUrl(user)}
                        alt="Avatar"
                        className="h-14 w-14 rounded-full border-border"
                    />
                    <button onClick={onEditPhoto}>Edit photo</button>
                    <input
                        accept="image/*"
                        ref={photoInputRef}
                        id="icon-button-file"
                        type="file"
                        capture="environment"
                        className="h-0 w-0 opacity-0"
                        onChange={e => handleChangeImage(e.target.files?.[0] || null)}
                    />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
                        disabled
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
        </AuthPageLayout>
    );
};

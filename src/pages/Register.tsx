import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { useMainStore } from "../lib/store/store";
import { Navbar } from "../components/Navbar";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const setUserData = useMainStore(state => state.setUser);

    const handleRegistration = async () => {
        const auth = getAuth(); // Ensures we are using the correct authentication instance
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Assuming 'setUser' expects a user object of this shape
            const user = {
                id: userCredential.user.uid,
                name,
                email: userCredential.user.email,
                image: null
            };
            setUserData(user);
            navigate("/");
        } catch (error) {
            console.error("Registration failed: ", error);
            // Add more sophisticated error handling here
        }
    };

    return (
        <div className="flex flex-col gap-4">
        <p className="text-primaryText text-center text-2xl">Profile Information</p>
            <Input
                value={name}
                onChange={(newValue) => setName(newValue)}
                label="Full Name"
                type="text"
                placeholder="John Doe"
            />
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
                type="password"
                placeholder="Enter password"
            />
            <button onClick={handleRegistration}>Register</button>
        <Navbar />
        </div>
    );
};

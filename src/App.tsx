import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { RegistrationPage } from "./pages/Register";
import { StoreInitializer } from "./components/StoreInitializer";
import { ProfilePage } from "./pages/Profile";
import { RequiresAuth } from "./components/RequitesAuth";

function App() {
    return (
        <div className="App px-4 py-6">
            <StoreInitializer />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/register"
                        element={<RegistrationPage/>}/>
                    <Route
                        path="/profile"
                        element={
                            <RequiresAuth>
                                <ProfilePage />
                            </RequiresAuth>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

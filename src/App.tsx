import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { StoreInitializer } from "./components/StoreInitializer";
import { ProfilePage } from "./pages/Profile";
import { RequiresAuth } from "./components/RequitesAuth";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import {
    PATH_EVENT_SETTINGS_TEMPLATE,
    PATH_EVENT_TEMPLATE,
    PATH_HOME,
    PATH_LOGIN,
    PATH_MY_EVENTS,
    PATH_PROFILE,
    PATH_REGISTER
} from "./lib/paths";
import { MyEvents } from "./pages/MyEvents";
import { EventSettingsPage } from "./pages/EventSettingsPage";
import { RegisterPage } from "./pages/Register";
import { EventDetailsModal } from "./components/EventDetailsModal";

function App() {
    return (
        <div className="App px-4 py-6">
            <StoreInitializer />

            <Routes>
                <Route path={PATH_HOME} element={<HomePage />} />
                <Route path={PATH_LOGIN} element={<LoginPage />} />
                <Route path={PATH_REGISTER} element={<RegisterPage />} />
                <Route
                    path={PATH_MY_EVENTS}
                    element={
                        <RequiresAuth>
                            <MyEvents />
                        </RequiresAuth>
                    }
                />
                <Route path={PATH_EVENT_SETTINGS_TEMPLATE} element={<EventSettingsPage />} />
                <Route
                    path={PATH_PROFILE}
                    element={
                        <RequiresAuth>
                            <ProfilePage />
                        </RequiresAuth>
                    }
                />
                <Route path={PATH_EVENT_TEMPLATE} element={<EventDetailsPage />} />
            </Routes>
            <EventDetailsModal />
        </div>
    );
}

export default App;

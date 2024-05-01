import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { StoreInitializer } from "./components/StoreInitializer";
import { ProfilePage } from "./pages/Profile";
import { RequiresAuth } from "./components/RequitesAuth";
import { EventDetails } from "./pages/EventDetails";
import {
    PATH_EVENT_TEMPLATE,
    PATH_HOME,
    PATH_LOGIN,
    PATH_MY_EVENTS,
    PATH_PROFILE
} from "./lib/paths";
import { MyEvents } from "./pages/MyEvents";

function App() {
    return (
        <div className="App px-4 py-6">
            <StoreInitializer />
            <Router>
                <Routes>
                    <Route path={PATH_HOME} element={<HomePage />} />
                    <Route path={PATH_LOGIN} element={<LoginPage />} />
                    <Route path={PATH_MY_EVENTS} element={<MyEvents />} />
                    <Route
                        path={PATH_PROFILE}
                        element={
                            <RequiresAuth>
                                <ProfilePage />
                            </RequiresAuth>
                        }
                    />
                    <Route
                        path={PATH_EVENT_TEMPLATE}
                        element={
                            <RequiresAuth>
                                <EventDetails />
                            </RequiresAuth>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

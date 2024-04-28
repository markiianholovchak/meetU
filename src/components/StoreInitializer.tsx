import { LOCAL_STORAGE_AUTH_KEY } from "../lib/constants/general.constants";
import { useMainStore } from "../lib/store/store";

export const StoreInitializer = () => {
    const user = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    useMainStore.setState({
        user: user ? JSON.parse(user) : null
    });
    return null;
};

import { StateCreator } from "zustand";
export type GlobalSlice = {
    user: User | null;
    setUser: (user: User | null) => void;
    categoryFilter: string | null;
    setCategoryFilter: (categoryFilter: string | null) => void;
    userLocation: {
        address: string;
        coordinates: MapCoordinates;
    } | null;
    setUserLocation: (
        userLocation: { address: string; coordinates: MapCoordinates } | null
    ) => void;
};
export const createGlobalSlice: StateCreator<GlobalSlice, [], [], GlobalSlice> = (set, get) => ({
    user: null,
    setUser: user => set({ user }),
    categoryFilter: null,
    setCategoryFilter: categoryFilter => set({ categoryFilter }),
    userCoordinates: null,
    userLocation: null,
    setUserLocation: userLocation => set({ userLocation })
});

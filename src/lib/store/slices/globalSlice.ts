import { StateCreator } from "zustand";
export type GlobalSlice = {
    user: User | null;
    setUser: (user: User | null) => void;
};
export const createGlobalSlice: StateCreator<GlobalSlice, [], [], GlobalSlice> = (set, get) => ({
    user: null,
    setUser: user => set({ user })
});

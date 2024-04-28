import { create } from "zustand";
import { GlobalSlice, createGlobalSlice } from "./slices/globalSlice";

type Store = GlobalSlice;

export const useMainStore = create<Store>((set, get, store) => ({
    ...createGlobalSlice(set, get, store)
}));

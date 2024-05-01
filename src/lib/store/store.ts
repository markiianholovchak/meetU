import { create } from "zustand";
import { GlobalSlice, createGlobalSlice } from "./slices/globalSlice";
import { EventFormSlice, createEventFormSlice } from "./slices/eventFormSlice";

type Store = GlobalSlice & EventFormSlice;

export const useMainStore = create<Store>((set, get, store) => ({
    ...createGlobalSlice(set, get, store),
    ...createEventFormSlice(set, get, store)
}));

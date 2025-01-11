import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Modals } from "../constants/modals";

interface UserDataState {
    
export const userData = create(persist(

export interface UserData {
    modal: Modals;
    setModal: (modal: Modals) => void;
}


export const userData = create<UserData>()(persist(
    (set, get) => {
        modal: Modals.NONE,
        setModal: (modal: Modals) => set({ ...get(), modal: modal })
    },
    {
        name: 'PRIMEBET::USER-DATA',
        storage: createJSONStorage(() => sessionStorage)
    }
))
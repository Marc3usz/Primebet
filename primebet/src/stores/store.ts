import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Modals } from "../constants/modals";
import { User, UserCredential } from "firebase/auth";

export interface UserData {
    modal: Modals;
    setModal: (modal: Modals) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    user?: User;
    setUser: (user?: User) => void;
}

export const userData = create<UserData>()(
    persist(
        (set, get) => ({
            modal: Modals.NONE,
            setModal: (modal: Modals) => set({ ...get(), modal: modal }),
            loggedIn: false,
            setLoggedIn: (loggedIn: boolean) =>
                set({ ...get(), loggedIn: loggedIn }),
            user: undefined,
            setUser: (user?: User) => set({ ...get(), user: user }),
        }),
        {
            name: "PRIMEBET::USER-DATA",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

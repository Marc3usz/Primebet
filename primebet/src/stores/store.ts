import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Modals } from "../constants/modals";
import { User, UserCredential } from "firebase/auth";
import { Betslip } from "../components/modals/Betslip";

export interface UserData {
    modal: Modals;
    setModal: (modal: Modals) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    user?: User;
    setUser: (user?: User) => void;
    betslip: unknown[] | null;
    emptyBetslip: () => void;
    appendBetslip: (newBet: unknown) => void;
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
            betslip: null,
            emptyBetslip: () => set({ ...get(), betslip: null, betslipKey: 0 }),
            appendBetslip: (newBet: unknown) =>
                set({ ...get(), betslip: [...(get().betslip ?? []), newBet] }),
        }),
        {
            name: "PRIMEBET::USER-DATA",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

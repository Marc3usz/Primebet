import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Modals } from "../constants/modals";
import { User } from "firebase/auth";

export interface UserData {
    modal: Modals;
    setModal: (modal: Modals) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    user?: User;
    setUser: (user?: User) => void;
    betslip: Bet[] | null;
    emptyBetslip: () => void;
    appendBetslip: (newBet: Bet) => void;
    credits: number;
    setCredits: (newCredits: number) => void;
}

export type Bet = {
    title: string;
    desc: string;
    date: number;
    odds: number;
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
            emptyBetslip: () => set({ ...get(), betslip: null }),
            appendBetslip: (newBet: Bet) =>
                set({ ...get(), betslip: [...(get().betslip ?? []), newBet] }),
            credits: 0,
            setCredits: (newCredits: number) => set({...get(), credits: newCredits})
        }),
        {
            name: "PRIMEBET::USER-DATA",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

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
    pollSemaphore: number;
    induceSemaphorePolling: () => void;
    setBetslip: (newBetslip: Bet[] | null) => void;
}

export type Bet = {
    title: string;
    desc: string;
    date: number;
    odds: number;
    id: string;
    outcome: string;
    bookmaker: string;
    sport_key: string;
};

export const userData = create<UserData>()(
    persist( // middleware zeby stan sie zapisywal w localstorage. Dzieki temu przy odswiezaniu np betslip sie nie resetuje
        (set, get) => ({
            modal: Modals.NONE, // szczerze to pewnie moglismy bez tego lol
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
            setCredits: (newCredits: number) =>
                set({ ...get(), credits: newCredits }),
            pollSemaphore: 0, // nie wiedzialem jak sie powinno robic refresh z firebase to zrobilem tak. Oczywiscie pozniej wykminilem
            induceSemaphorePolling: () =>
                set({ ...get(), pollSemaphore: get().pollSemaphore + 1 }),
            setBetslip: (newBetslip: Bet[] | null) =>
                set({ ...get(), betslip: newBetslip }),
        }),
        {
            name: "PRIMEBET::USER-DATA",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

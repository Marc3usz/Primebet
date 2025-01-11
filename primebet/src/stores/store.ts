import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserDataState {
    
export const userData = create(persist(
    (set, get) => {
        
    },
    {
        name: 'PRIMEBET::USER-DATA',
        storage: createJSONStorage(() => sessionStorage)
    }
))
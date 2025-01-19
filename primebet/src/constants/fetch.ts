import {functions} from "../firebase/firebase.config"
import { type HttpsCallable, httpsCallable } from "firebase/functions"

// mapuje filtery do call api, nie chcielismy wiecej ogarniac to tylko jeden jest call lol, inaczej bysmy to bardziej rozwineli
// proxy po prostu daje nam wbudowany error handling
export const fetchMap: Record<string, HttpsCallable | null> = new Proxy(
    {
        "recommended": httpsCallable(functions, "fetchBookmakerOdds"),
        "*": null
    },
    {
        // @ts-ignore
        get: (target, prop) => prop in target ? target[prop] : target["*"] // cos sie plulo z target[prop] ale nwm czemu bo sie tylko wywoluje jak prop jest w targecie
    }
)
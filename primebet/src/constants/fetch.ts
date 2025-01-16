import {functions} from "../firebase/firebase.config"
import { type HttpsCallable, httpsCallable } from "firebase/functions"

export const fetchMap: Record<string, HttpsCallable | null> = new Proxy(
    {
        "recommended": httpsCallable(functions, "fetchBookmakerOdds"),
        "*": null
    },
    {
        get: (target, prop) => prop in target ? target[prop] : target["*"]
    }
)
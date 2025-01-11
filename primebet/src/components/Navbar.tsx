import { useNavigate } from "react-router-dom";
import { Links } from "../constants/links";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const nav = useNavigate();
    const liveUserData = useStore(userData);
    const [loginSignoutFN, setLoginSignoutFN] = useState(() => () => nav(Links.LOGIN));
    const [loginSignout, setLoginSignout] = useState("Log In");

    useEffect(() => {
        if (liveUserData.loggedIn) {
            setLoginSignout("Sign Out")
            setLoginSignoutFN(
                () => () => {console.log("wylogowano"); liveUserData.setLoggedIn(false)}
            )
        } else {
            setLoginSignout("Log In")
            setLoginSignoutFN(
                () => () => nav(Links.LOGIN)
            )
        }
    }, [liveUserData]);

    return (
        <div className="h-[10%] bg-slate-800 flex text-slate-100">
            <div className="flex w-[80%] flex-row justify-evenly">
                {/* <Logo /> */}
                <button onClick={() => nav(Links.HOMEPAGE)}>Home</button>
                <button onClick={() => nav(Links.BETS)}>My Bets</button>
                <button onClick={loginSignoutFN}>{loginSignout}</button>
            </div>
        </div>
    );
};

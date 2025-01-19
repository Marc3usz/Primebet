import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from "../constants/links";
import { Homepage } from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
import { userData } from "../stores/store";
import { useStore } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect } from "react";
import { Error404 } from "../pages/404";
import { RedirectPage } from "../pages/RedirectPage";
import { Offers } from "../components/Offers";
import MyBets from "../components/MyBets";
import { fetchUserData } from "../firebase/userdataFetcher";

const router = createBrowserRouter([
    {
        path: Links.HOMEPAGE,
        element: <Homepage />,
        children: [
            {
                index: true,
                element: <h1 className="text-white">Default</h1>
            },
            {
                path: Links.BETS,
                element: <MyBets />,
            },
            {
                path: Links.OFFERS,
                element: <Offers />,
            },
        ],
        errorElement: <Error404 />,
    },
    {
        path: Links.LOGIN,
        element: <LoginPage />,
    },
    {
        path: Links.REDIRECT,
        element: <RedirectPage />,
    },
]);

export const AppRouter = () => {
    const liveUserData = useStore(userData);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && !liveUserData.loggedIn) {
                liveUserData.setLoggedIn(true);
                liveUserData.setUser(user ?? undefined);
            } else if (!user && liveUserData.loggedIn) {
                liveUserData.setLoggedIn(false);
                liveUserData.setUser(user ?? undefined);
            }
            fetchUserData().then((data) =>
                data?.credits != liveUserData.credits
                    ? liveUserData.setCredits(data?.credits ?? 0)
                    : () => {}
            );
        });
        return () => unsubscribe();
    }, [auth, liveUserData.user]);

    return <RouterProvider router={router} />;
};

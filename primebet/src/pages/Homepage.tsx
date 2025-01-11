import { useStore } from "zustand";
import { userData } from "../stores/store";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const Homepage = () => {
    const liveUserData = useStore(userData);

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="flex flex-row w-full h-full">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

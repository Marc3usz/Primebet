import { useState } from "react";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Betslip } from "../components/modals/Betslip";
import { useNavigate } from "react-router-dom";
import { ScrollbarTailwindStyle } from "../constants/Scrollstyle";

const PLACEHOLDER = () => {
    const liveUserData = useStore(userData);
    const navigate = useNavigate();

    const handleAddBet = () => {
        if (!liveUserData.loggedIn) {
            navigate("/login");
            return;
        }

        liveUserData.appendBetslip({
            title: "FC Barcelona vs Real Madrid",
            date: Date.now(),
            odds: 1.0,
            desc: "FC Barcelona 4.5+ goals",
        });
    };

    return (
        <div className="w-fit h-fit">
            <h1 className="text-base">ADD EXAMPLE BET</h1>
            <button onClick={handleAddBet} className="bg-blue-500 text-white p-2 rounded">
                Add Test Bet
            </button>
        </div>
    );
};

export default PLACEHOLDER;

export const Homepage = () => {
    const liveUserData = useStore(userData);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const toggleModal = () => {
        setIsModalVisible((state) => !state);
    };

    return (
        <div className={`w-full h-full ${ScrollbarTailwindStyle}`}>
            <Navbar />
            <div className="flex flex-row w-full h-[90%]">
                <Sidebar />
                <PLACEHOLDER />
                <Outlet />
            </div>
            {!!!liveUserData.betslip || (
                <Betslip
                    isVisible={isModalVisible}
                    onClose={toggleModal}
                    clearBetslip={liveUserData.emptyBetslip}
                    betslip={liveUserData.betslip}
                />
            )}
        </div>
    );
};
import { useState } from "react";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Betslip } from "../components/modals/Betslip";

const PLACEHOLDER = () => {
    const liveUserData = useStore(userData);
    return <div className="w-fit h-fit">
    <h1>ADD EXAMPLE BET</h1>
    <button onClick={() => liveUserData.appendBetslip({title: "FC Barcelona vs Real Madrid", datetime: (new Date).getUTCDate(), odds: 1})}>Add Test Bet</button>    
    </div>
}


export const Homepage = () => {
    const liveUserData = useStore(userData);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const toggleModal = () => {
        setIsModalVisible(state => !state);
    };

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="flex flex-row w-full h-[90%]">
                <Sidebar />
                <PLACEHOLDER />
                <Outlet />
            </div>
            {!!!liveUserData.betslip || <Betslip isVisible={isModalVisible} onClose={toggleModal} />}
        </div>
    );
};
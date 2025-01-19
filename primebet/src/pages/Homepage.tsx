import { useState } from "react";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Betslip } from "../components/modals/Betslip";
import { PartialLinks } from "../constants/links";
import { SidebarElement } from "../components/SidebarElement";

export const Homepage = () => {
    const liveUserData = useStore(userData);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const toggleModal = () => {
        setIsModalVisible((state) => !state);
    };

    return (
        <div className={`w-full h-fit`}>
            <Navbar />
            <div className="flex flex-row w-full h-fit">
                <Sidebar>
                    <SidebarElement label={"Recommended Bets"} targetPath={PartialLinks.OFFERS + "recommended"}/>
                </Sidebar>
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
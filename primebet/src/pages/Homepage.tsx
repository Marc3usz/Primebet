import { useState } from "react";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Betslip } from "../components/modals/Betslip";
import { PartialLinks } from "../constants/links";
import { SidebarElement } from "../components/SidebarElement";
// homepage (tutaj juz ladnie wyglada bo wysokopoziomowo napisane)
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
                    <h2>Bet Offers:</h2>
                    <SidebarElement label={"Recommended Bets"} targetPath={PartialLinks.OFFERS + "recommended"}/>
                    <SidebarElement label={"Women's NBA"} targetPath={PartialLinks.OFFERS + "WNBA"}/>
                    <SidebarElement label={"E-sports"} targetPath={PartialLinks.OFFERS + "esports"}/>
                    <SidebarElement label={"Rugby"} targetPath={PartialLinks.OFFERS + "rugby"}/>
                    <SidebarElement label={"Live"} targetPath={PartialLinks.OFFERS + "live"}/>
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
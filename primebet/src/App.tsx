import { AppRouter } from "./routing/router";
import { Footer } from "./components/Footer";
import "./index.css";
import { ScrollbarTailwindStyle } from "./constants/Scrollstyle";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase.config";
import { useStore } from "zustand";
import { userData, Bet } from "./stores/store";
import { doc, onSnapshot } from "firebase/firestore";
import { Betslip } from "./components/modals/Betslip";

function App() {
    const liveUserData = useStore(userData);
    const [betslipVisible, setBetslipVisible] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, "Users", userId);
            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    liveUserData.setCredits(userData?.credits ?? 0);
                }
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser, liveUserData]);

    const handleAddToBetslip = (bet: Bet) => {
        liveUserData.appendBetslip(bet);
        setBetslipVisible(true);
    };

    return (
        <div className={`flex flex-col-reverse w-full h-full ${ScrollbarTailwindStyle}`}>
            <div>
                <Footer />
            </div>
            <div className="flex h-full min-h-screen">
                <AppRouter onAddToBetslip={handleAddToBetslip} />
            </div>
            {betslipVisible && (
                <Betslip
                    isVisible={betslipVisible}
                    onClose={() => setBetslipVisible(false)}
                    clearBetslip={() => {
                        liveUserData.emptyBetslip();
                        setBetslipVisible(false);
                    }}
                    betslip={liveUserData.betslip || []}
                />
            )}
        </div>
    );
}

export default App;
import { ScrollbarTailwindStyle } from "../../constants/Scrollstyle";
import { Bet } from "../../stores/store";
import { BetslipElement } from "../BetslipElement";
import { functions } from "../../firebase/firebase.config";
import { httpsCallable } from "firebase/functions";
import { userData } from "../../stores/store";
import { useState } from "react";
import { useStore } from "zustand";
import { Links } from "../../constants/links";
import { useNavigate } from "react-router-dom";
import { showAlert } from "./CustomAlert";
import { Empty } from "../Empty";
// funkcja z firebase (jeszcze jest jedna gdzies w innym pliku)
const buyBet = httpsCallable(functions, "buyBet");

const generateBetSlipJson = (betAmount: number, betslip: Bet[]) => {
    // generuje jsona dla funkcji
    const games = betslip.map((bet) => {
        let prediction = "";
        if (bet.outcome === bet.title) {
            prediction = "home_team";
        } else if (bet.outcome === bet.desc) {
            prediction = "away_team";
        } else {
            prediction = "draw";
        }

        return {
            id: bet.id,
            home_team: bet.desc.split(" vs ")[0],
            away_team: bet.desc.split(" vs ")[1],
            commence_time: new Date(bet.date).toISOString(),
            odds: bet.odds,
            prediction: prediction,
            name: bet.desc,
        };
    });

    return {
        bet_amount: betAmount,
        games: games,
    };
};
// modal od betslipa
export const Betslip = ({
    isVisible,
    onClose,
    clearBetslip,
    betslip,
}: {
    isVisible: boolean;
    onClose: () => void;
    clearBetslip: () => void;
    betslip: Bet[];
}) => {
    const liveUserData = useStore(userData);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // oblicza sumaryczny kurs
    let totalOdds = 1;
    for (const bet of betslip) {
        totalOdds *= bet.odds;
    }

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setBetAmount(value);
        }
    };

    const handleBuyBet = async () => {
        if (betAmount > liveUserData.credits) {
            alert("Insufficient credits to place the bet.");
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);
        let response;

        try {
            const betJson = generateBetSlipJson(betAmount, betslip);

            response = await buyBet(betJson);

            clearBetslip();
            showAlert(true, "Bet placed successfully!")
            liveUserData.induceSemaphorePolling()
        } catch (error) {
            console.error("Error placing bet:", error, response?.data);
            showAlert(false, "An error occured while placing the bet")
        } finally {
            setIsSubmitting(false);
        }
    };

    const nav = useNavigate();
    return (
        <div className="fixed bottom-4 right-4 bg-slate-800 shadow-md rounded-md p-4 w-64 h-fit transition-all">
            <div className="flex justify-between items-center mb-2 flex-row">
                <div className="w-fit flex gap-3">
                    <h3 className="text-lg font-semibold text-white">
                        Betslip
                    </h3>
                    <p className="text-sm text-white bg-slate-600 p-2 rounded-md pb-0">
                        {totalOdds.toFixed(2)}
                    </p>
                </div>
                <div className="w-fit flex gap-3">
                    <button
                        onClick={clearBetslip}
                        className="text-white hover:text-slate-300"
                    >
                        X
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-slate-300"
                    >
                        {isVisible ? "⮝" : "⮟"}
                    </button>
                </div>
            </div>

            <div
                className={
                    (isVisible ? "h-0" : "h-[70vh]") +
                    ` transition-all overflow-scroll flex ${ScrollbarTailwindStyle} flex-col gap-2 w-full overflow-x-visible`
                }
            >
                {betslip.length !== 0 ? (betslip.map((bet) => (
                    <BetslipElement bet={bet} key={bet.id} />
                ))) : <Empty message="No bets here..."/> /*jak nie masz nic obstawionego to ci duszka wyswietla lol*/}
            </div>

            {!isVisible && (
                <div className="mt-4 flex flex-col items-center gap-3">
                    <div className="flex justify-between w-full">
                        <input
                            type="number"
                            value={betAmount}
                            onChange={handleBetAmountChange}
                            className="w-24 p-2 bg-slate-600 text-white rounded-md"
                            placeholder="Bet Amount"
                        />
                        {liveUserData.loggedIn ? <button
                            onClick={handleBuyBet}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isSubmitting || betAmount <= 0}
                        >
                            Buy Bet
                        </button> : <button
                            onClick={() => nav(Links.LOGIN)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                        >
                            Log In to Buy
                        </button>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

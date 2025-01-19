import { ScrollbarTailwindStyle } from "../../constants/Scrollstyle";
import { Bet } from "../../stores/store";
import { BetslipElement } from "../BetslipElement";
import { functions } from "../../firebase/firebase.config";
import { httpsCallable } from "firebase/functions";
import { userData } from "../../stores/store";
import { useState } from "react";
import { useStore } from "zustand";

const buyBet = httpsCallable(functions, "buyBet");

const generateBetSlipJson = (betAmount: number, betslip: Bet[]) => {
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
      alert("Bet placed successfully!");
    } catch (error) {
      console.error("Error placing bet:", error, response?.data);
      alert("There was an error placing your bet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 shadow-md rounded-md p-4 w-64 h-fit transition-all">
      <div className="flex justify-between items-center mb-2 flex-row">
        <div className="w-fit flex gap-3">
          <h3 className="text-lg font-semibold text-white">Betslip</h3>
          <p className="text-sm text-white bg-slate-600 p-2 rounded-md pb-0">
            {totalOdds.toFixed(2)}
          </p>
        </div>
        <div className="w-fit flex gap-3">
          <button onClick={clearBetslip} className="text-white hover:text-slate-300">
            X
          </button>
          <button onClick={onClose} className="text-white hover:text-slate-300">
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
        {betslip.map((bet) => (
          <BetslipElement bet={bet} key={bet.id} />
        ))}
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
            <button
              onClick={handleBuyBet}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting || betAmount <= 0}
            >
              Buy Bet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

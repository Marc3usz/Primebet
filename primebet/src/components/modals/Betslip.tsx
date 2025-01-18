import { ScrollbarTailwindStyle } from "../../constants/Scrollstyle";
import { Bet } from "../../stores/store";
import { BetslipElement } from "../BetslipElement";
import { auth, db } from "../../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useStore } from "zustand";
import { userData } from "../../stores/store";

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

  const handleBuyBetslip = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to purchase the betslip.");
      return;
    }

    try {
      const userBetRef = collection(db, `Users/${auth.currentUser.uid}/bets`);
      const combinedBet = {
        games: betslip,
        status: "unsettled",
        totalOdds: betslip.reduce((acc, bet) => acc * bet.odds, 1),
        bet_amount: betslip.length * 10,
      };

      await addDoc(userBetRef, combinedBet);

      liveUserData.setCredits(
        liveUserData.credits - combinedBet.bet_amount
      );
      clearBetslip();
      alert("Betslip purchased successfully!");
    } catch (error) {
      console.error("Error buying betslip:", error);
      alert("An error occurred while purchasing the betslip.");
    }
  };

  let totalOdds = 1;
  for (const bet of betslip) {
    totalOdds *= bet.odds;
  }

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
          ` transition-all overflow-scroll flex ${ScrollbarTailwindStyle} flex-col gap-2 w-fit overflow-x-visible`
        }
      >
        {betslip.map((bet) => (
          <BetslipElement bet={bet} key={bet.title + bet.date} />
        ))}
      </div>
      {betslip.length > 0 && (
        <button
          onClick={handleBuyBetslip}
          className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Buy Betslip
        </button>
      )}
    </div>
  );
};
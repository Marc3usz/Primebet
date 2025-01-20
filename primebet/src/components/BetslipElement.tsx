import { type Bet, userData } from "../stores/store";
import { useStore } from "zustand";

export const BetslipElement = ({ bet }: { bet: Bet }) => {
  const liveUserData = useStore(userData);
  if (!liveUserData) {
    return <span className="w-full h-fit flex flex-col items-center justify-between bg-slate-700 p-3 rounded-md gap-2 pb-0">
    <p className="text-red-500">Error: No user data</p>
  </span>
  }

  const handleDeleteBet = (betId: string) => {
    // Usuwa beta o tym samym ID
    const updatedBetslip = (liveUserData!).betslip?.filter((existingBet: Bet) => existingBet.id !== betId);
    
    (liveUserData!).setBetslip(updatedBetslip ?? null); // Update betslipu w storze
  };

  if (!bet) {
    return (
      <span className="w-full h-fit flex flex-col items-center justify-between bg-slate-700 p-3 rounded-md gap-2 pb-0">
        <p className="text-red-500">Error: Missing bet data</p>
      </span>
    );
  }

  return (
    <span className="w-full h-fit flex flex-col items-center justify-between bg-slate-700 p-3 rounded-md gap-2 pb-0">
      <div className="w-full flex justify-between items-center">
        <p className="text-white text-lg text-left">{bet.title}</p>
        <button
          className="text-red-500 text-xl"
          onClick={() => handleDeleteBet(bet.id)} // usuwa bet przy kliknieciu
        >
          &times;
        </button>
      </div>
      <p className="text-white text-xs text-left">{new Date(bet.date).toDateString()}</p>
      <p className="text-slate-400 text-xs text-left">{bet.bookmaker}</p>
      <span className="w-full h-fit flex flex-row items-end justify-between pb-0 mb-0">
        <p className="text-sm text-white bg-slate-600 p-1 rounded-md pb-0 rounded-b-none mb-0 mt-2 break-words">
          {bet.outcome}
        </p>
        <p className="text-sm text-white bg-slate-600 p-1 rounded-md pb-0 rounded-b-none mb-0">
          {bet.odds.toFixed(2)}
        </p>
      </span>
    </span>
  );
};

import { Bet } from "../stores/store";

export const BetslipElement = ({ bet }: { bet: Bet }) => {
  if (!bet) {
    return (
      <span className="w-full h-fit flex flex-col items-center justify-between bg-slate-700 p-3 rounded-md gap-2 pb-0">
        <p className="text-red-500">Error: Missing bet data</p>
      </span>
    );
  }

  return (
    <span className="w-ull h-fit flex flex-col items-center justify-between bg-slate-700 p-3 rounded-md gap-2 pb-0">
      <p className="text-white text-lg text-left">{bet.title}</p>
      <p className="text-white text-xs text-left">{new Date(bet.date).toDateString()}</p>
      <p className="text-slate-400 text-xs text-left">{bet.bookmaker}</p>
      <span className="w-full h-5 flex flex-row items-end justify-between pb-0 mb-0">
        <p className="text-sm text-white bg-slate-600 p-1 rounded-md pb-0 rounded-b-none mb-0 mt-2">
          {bet.outcome}
        </p>
        <p className="text-sm text-white bg-slate-600 p-1 rounded-md pb-0 rounded-b-none mb-0">
          {bet.odds.toFixed(2)}
        </p>
      </span>
    </span>
  );
};
import { ScrollbarTailwindStyle } from "../../constants/Scrollstyle";
import { Bet } from "../../stores/store";
import { BetslipElement } from "../BetslipElement";

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
    let currentIdx = 0;
    const getKey = () => {
        return currentIdx++;
    };

    let totalOdds = 1;
    for (const bet of betslip) {
        totalOdds *= bet.odds;
    }

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
                    ` transition-all overflow-scroll flex ${ScrollbarTailwindStyle} flex-col gap-2 w-fit overflow-x-visible`
                }
            >
                {betslip.map((bet) => (
                    <BetslipElement bet={bet} key={getKey()} />
                ))}
            </div>
        </div>
    );
};

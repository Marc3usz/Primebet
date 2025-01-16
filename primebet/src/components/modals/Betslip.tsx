export const Betslip = ({
    isVisible,
    onClose,
    clearBetslip,
}: {
    isVisible: boolean;
    onClose: () => void;
    clearBetslip: () => void;
}) => {
    return (
        <div className="fixed bottom-4 right-4 bg-slate-800 shadow-md rounded-md p-4 w-64 h-fit transition-all">
            <div className="flex justify-between items-center mb-2 flex-row">
                <h3 className="text-lg font-semibold text-white">Betslip</h3>
                <div className="w-fit flex gap-3">
                {
                    isVisible || <button onClick={clearBetslip} className="text-white hover:text-slate-300">X</button>
                }
                <button
                    onClick={onClose}
                    className="text-white hover:text-slate-300"
                >
                    {isVisible ? "⮝" : "⮟"}
                </button>
                </div>
            </div>
            <div className={(isVisible ? "h-0" : "h-[70vh]") + " transition-all overflow-hidden flex"}>
            <p className="text-sm text-white">
                This is a modal located in the bottom-right corner of the page.

            </p>
            </div>
        </div>
    );
};

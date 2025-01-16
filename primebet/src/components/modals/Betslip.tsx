export const Betslip = ({
    isVisible,
    onClose,
}: {
    isVisible: boolean;
    onClose: () => void;
}) => {
    return (
        <div className="fixed bottom-4 right-4 bg-slate-800 shadow-md rounded-md p-4 w-64 h-fit transition-all">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">Betslip</h3>
                <button
                    onClick={onClose}
                    className="text-white hover:text-slate-300"
                >
                    {isVisible ? "⮝" : "⮟"}
                </button>
            </div>
            <div className={(isVisible ? "h-0" : "h-[70vh]") + " transition-all overflow-hidden flex"}>
            <p className="text-sm text-white">
                This is a modal located in the bottom-right corner of the page.

            </p>
            </div>
        </div>
    );
};

import { useState } from "react";

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="w-1/6 h-full">
            <button
                onClick={() => setExpanded((state) => !state)}
                className="bg-slate-600 m-1 rounded-md text-slate-100 z-10 relative w-[97%]"
            >
                {expanded ? "Hide Bets" : "Recommended"}
            </button>
            <div
                className={
                    (expanded ? "w-full" : "w-0") +
                    " bg-slate-700 transition-all flex justify-start flex-col h-full text-slate-100 translate-y-[-2rem] z-0 relative pt-8"
                }
            >
            <div>
                content
            </div>
            </div>
        </div>
    );
};

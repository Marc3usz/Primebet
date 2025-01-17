import { useState } from "react";
import { ScrollbarTailwindStyle } from "../constants/Scrollstyle";

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="w-[10%] h-full bg-slate-800">
            <button
                onClick={() => setExpanded((state) => !state)}
                className="bg-slate-600 m-1 rounded-b-md text-slate-100 z-10 w-full mt-0 ml-0 h-6 relative"
            >
                {expanded ? "Hide" : "Expand"}
            </button>
            <div
                className={
                    (expanded ? "w-full" : "w-0") +
                    ` bg-slate-700 transition-all flex justify-start flex-col h-[calc(100%+1.75rem)] translate-y-[-1.75rem] text-slate-100 z-0 relative pt-8 overflow-x-clip ${ScrollbarTailwindStyle}`
                }
            >
                {!expanded || <div>content</div>}
            </div>
        </div>
    );
};

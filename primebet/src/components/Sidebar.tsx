import { useState } from "react";

export const Sidebar = ({ children } : {children : React.CElement<any, any>}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="relative">
            {/* Sidebar Bump */}
            <div
                onClick={() => setExpanded((state) => !state)}
                className={`fixed top-1/2 -translate-y-1/2 left-0 bg-slate-600 w-3 h-24 rounded-r-md cursor-pointer z-20 transition-transform ${
                    expanded ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                {/* Optional Icon/Text on the bump */}
            </div>

            {/* Sidebar Content */}
            <div
                className={`fixed top-0 left-0 h-screen bg-slate-900 text-slate-100 shadow-lg transition-transform transform pt-5 ${
                    expanded ? "translate-x-0" : "-translate-x-full"
                } w-[min(300px,60vw)] z-10`}
            >
                <button
                    onClick={() => setExpanded(false)}
                    className="absolute top-4 right-4 bg-slate-700 text-white px-2 py-1 rounded-md"
                >
                    Close
                </button>
                <div className="p-4 h-full overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

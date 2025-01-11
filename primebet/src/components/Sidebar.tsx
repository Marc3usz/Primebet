import { useState } from "react"

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);


    return <div className={(expanded?"w-1/6":"w-[8%]") + " bg-slate-700 transition-all flex justify-start flex-col"}>
        <button onClick={() => setExpanded((state) => !state)} className="bg-slate-600 m-1 rounded-sm">
            {expanded?"Hide Bets":"Recommended"}
        </button>
    </div>
}
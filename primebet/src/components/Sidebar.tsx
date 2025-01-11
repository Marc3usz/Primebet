import { useState } from "react"

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);


    return <div className={(expanded?"w-1/6":"w-[7%]") + " bg-slate-700 transition-all flex justify-start flex-col"}>
        <button onClick={() => setExpanded((state) => !state)} >
            {expanded?"Hide Bets":"Bets"}
        </button>
    </div>
}
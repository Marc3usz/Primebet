import { useState } from "react"

export const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);


    return <div className={(expanded?"w-1/6":"w-[7%]") + " bg-slate-500 transition-all"}>
        <button onClick={() => setExpanded((state) => !state)}>
            
        </button>
    </div>
}
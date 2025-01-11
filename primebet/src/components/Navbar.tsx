import { useNavigate } from "react-router-dom"
import { Links } from "../constants/links"


export const Navbar = () => {
    const nav = useNavigate()


    return <div className="h-[10%] bg-slate-800 flex text-slate-100">
        <div className="flex w-[80%] flex-row justify-evenly">
            {/* <Logo /> */}
            <button onClick={() => nav(Links.HOMEPAGE)}>Home</button>
            <button onClick={() => nav(Links.BETS)}>My Bets</button>
        </div>
    </div>
}
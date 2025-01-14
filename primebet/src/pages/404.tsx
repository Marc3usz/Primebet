import { Navbar } from "../components/Navbar"
import { useLocation } from "react-router-dom"
import { ScrollbarTailwindStyle } from "../constants/Scrollstyle";
import { useLottie } from "lottie-react";
import error404animation from '../../public/404.json'

export const Error404 = () => {

    const {pathname} = useLocation();

    const {View} = useLottie({
        loop: true,
        animationData: error404animation,
    });

    return <div className={`w-full h-[90.9%] ${ScrollbarTailwindStyle}`}>
        <Navbar />
        <div className="bg-slate-600 w-full h-full text-slate-100 flex items-center justify-center flex-col">
            {View}
            <br />
            <p className="text-3xl">Path `{pathname}` is not handled by our application</p>
        </div>
    </div>
}
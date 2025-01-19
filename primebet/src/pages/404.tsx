import { Navbar } from "../components/Navbar"
import { useLocation } from "react-router-dom"
import { useLottie } from "lottie-react";
import error404animation from '../assets/404.json'
// 404 page (teoretycznie wyswietla sie przy innych bledach ale mialo byc po prostu error handling)
export const Error404 = () => {

    const {pathname} = useLocation();

    const { View } = useLottie(
        {
            loop: true,
            animationData: error404animation,
        },
        {
            height: "60vh",
        }
    );
    
    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full text-slate-100 flex items-center justify-center flex-col-reverse md:flex-row p-4">
                <div className="w-full md:w-1/2 flex justify-center">{View}</div>
                <div className="w-full md:w-1/2 text-center md:text-left px-4">
                    <p className="text-2xl md:text-3xl">
                        Exception occured at <code className="bg-slate-600 px-1 rounded">{pathname}</code> or path is not handled by our application
                    </p>
                </div>
            </div>
        </div>
    );
    
}
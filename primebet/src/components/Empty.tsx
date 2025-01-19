import { useLottie } from "lottie-react";
import emptySearchAnimation from "../assets/empty.json"

// uzywany jako placeholder dla pustego contentu

export const Empty = ({message} : {message: string}) => {
    const { View } = useLottie(
        {
            loop: true,
            animationData: emptySearchAnimation,
        },
        {
            height: "30vh",
        }
    );

    return (
        <div className="w-fit h-fit flex flex-col justify-evenly items-center bg-slate-600 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl text-white">OOPS...</h1>
            {View}
            <h3 className="text-white">{message}</h3>
        </div>
    )
}
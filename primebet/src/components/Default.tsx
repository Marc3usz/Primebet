import { useEffect, useState } from "react";
import { fetchUserData } from "../firebase/userdataFetcher";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Links } from "../constants/links";
// default homepage element, czyli te statystyki
export const Default = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        getUserData();
    }, []);
    const nav = useNavigate()

    if (!userData) {
        return (
            <div className="flex w-full h-screen justify-center items-center flex-col">
                <h1 className="text-center text-white text-4xl w-full h-fit">
                    <a onClick={e => {e.preventDefault(); nav(Links.LOGIN)}}
                      className="hover:cursor-pointer hover:bg-blue-600 bg-blue-500 p-6 py-4 rounded-lg"
                    >Log in</a> to view account stats
                </h1>
            </div>
        );
    }

    const creationDate = (userData.creationDate as Timestamp)
        .toDate()
        .toDateString();

    const calculateLevel = (wager: number) => {
        let level = 1;
        let lowerLimit = 0;
        let upperLimit = 10000;

        while (wager >= upperLimit) {
            level += 1;
            lowerLimit = upperLimit;
            upperLimit *= 2;
        }

        const remaining = upperLimit - wager;
        const progress = (wager - lowerLimit) / (upperLimit - lowerLimit);

        return { level, remaining, progress, nextLevel: upperLimit };
    };

    const { level, remaining, progress, nextLevel } = calculateLevel(
        userData.wager
    );

    return (
        <div className="flex flex-col w-full min-h-screen justify-center items-center gap-6 p-4">
            <h1 className="text-4xl text-white font-bold">Account Stats</h1>

            <p className="text-white text-lg sm:text-2xl bg-slate-800 p-6 rounded-lg max-w-screen-md w-full text-center">
                <strong>Creation Date:</strong> {creationDate}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg max-w-screen-md w-full">
                <p className="text-white text-lg sm:text-xl">
                    <strong>Wager:</strong> {userData.wager}
                </p>
                <p className="text-white text-lg sm:text-xl">
                    <strong>Wins:</strong> {userData.wins}
                </p>
                <p className="text-white text-lg sm:text-xl">
                    <strong>Losses:</strong> {userData.losses}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-800 p-6 rounded-lg max-w-screen-md w-full">
                <p className="text-white text-lg sm:text-xl">
                    <strong>Lost:</strong> {userData.lost}
                </p>
                <p className="text-white text-lg sm:text-xl">
                    <strong>Won:</strong> {userData.won}
                </p>
                <p className="text-white text-lg sm:text-xl">
                    <strong>Luckiest Win:</strong> {userData.luckiest_win}
                </p>
            </div>

            <div className="w-full max-w-screen-md bg-slate-800 p-6 rounded-lg">
                <h2 className="text-xl sm:text-2xl text-white mb-4 text-center">
                    Level Progress
                </h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm sm:text-lg">
                        Level {level}
                    </span>
                    <span className="text-white text-sm sm:text-lg">
                        Next Level: {nextLevel.toLocaleString()} Wager
                    </span>
                </div>
                <div className="w-full h-4 bg-gray-600 rounded-lg overflow-hidden">
                    <div
                        className="h-full bg-green-500"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
                <p className="text-center text-white mt-2">
                    {remaining.toLocaleString()} wager remaining to Level{" "}
                    {level + 1}
                </p>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useStore } from "zustand";
import { userData } from "../stores/store";

interface Game {
    id: string;
    sport_title: string;
    home_team: string;
    away_team: string;
    commence_time: string;
    odds: number;
    status: "won" | "lost" | "unsettled";
    prediction: string;
}

interface Bet {
    status: "unsettled" | "won" | "lost";
    bet_amount: number;
    odds: number;
    games: Game[];
}

const MyBets: React.FC = () => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"unsettled" | "won" | "lost">(
        "unsettled"
    );
    // to od tego dropdowna jest
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inducePoll = useStore(userData).induceSemaphorePolling;

    useEffect(() => {
      // pobiera dane w listenerze od firebase
        const fetchBetsForUser = () => {
            setLoading(true);

            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            const betsQuery = query(
                collection(db, `Users/${user.uid}/bets`),
                where("status", "==", filter)
            );

            const unsubscribe = onSnapshot(betsQuery, (querySnapshot) => {
                const fetchedBets = querySnapshot.docs.map(
                    (doc) => doc.data() as Bet
                );
                setBets(fetchedBets);
                setLoading(false);
            });

            return () => unsubscribe();
        };

        const unsubscribe = fetchBetsForUser();
        inducePoll();
        return unsubscribe;
    }, [filter]);

    return (
        <div className="w-full h-fit bg-slate-700 text-slate-100 flex flex-col items-center py-3">
            <div className="flex items-center justify-between w-2/3 mt-6 mb-4 gap-2">
                <h1 className="text-2xl font-bold">
                    {filter === "unsettled"
                        ? "Active Bets"
                        : filter === "won"
                        ? "Won Bets"
                        : "Lost Bets"}
                </h1>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-slate-800 text-slate-100 px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        {filter === "unsettled"
                            ? "Active"
                            : filter === "won"
                            ? "Won"
                            : "Lost"}
                        <span
                            className={`${
                                dropdownOpen ? "rotate-180" : ""
                            } transition-transform`}
                        >
                            ▼
                        </span>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute top-full mt-2 bg-slate-800 shadow-lg rounded-md overflow-hidden w-full">
                            <button
                                className={`block w-full px-4 py-2 text-left hover:bg-slate-600 ${
                                    filter === "unsettled"
                                        ? "text-blue-500"
                                        : ""
                                }`}
                                onClick={() => {
                                    setFilter("unsettled");
                                    setDropdownOpen(false);
                                }}
                            >
                                Active
                            </button>
                            <button
                                className={`block w-full px-4 py-2 text-left hover:bg-slate-600 ${
                                    filter === "won" ? "text-blue-500" : ""
                                }`}
                                onClick={() => {
                                    setFilter("won");
                                    setDropdownOpen(false);
                                }}
                            >
                                Won
                            </button>
                            <button
                                className={`block w-full px-4 py-2 text-left hover:bg-slate-600 ${
                                    filter === "lost" ? "text-blue-500" : ""
                                }`}
                                onClick={() => {
                                    setFilter("lost");
                                    setDropdownOpen(false);
                                }}
                            >
                                Lost
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* Tutaj jak sie laduje to wyswietla loading */}
            {loading ? (
                <p>Loading...</p>
            ) : bets.length === 0 ? (
                <p>No bets to display</p>
            ) : (
              // a tutaj jak sa bety to po prostu je wyswietla
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-2/3">
                    {bets.map((bet, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 rounded-lg p-4 shadow-md flex flex-col"
                        >
                            <h2 className="text-lg font-semibold mb-2">
                                {bet.games.length > 1
                                    ? `Combined Bet (Total Odds: ${bet.odds})`
                                    : `Single Bet (Total Odds: ${bet.odds})`}
                            </h2>
                            <div className="text-sm">
                              {/* niby powinno byc jako osobny element ale maks chyba lekki tunnel vision dostal jak to pisal */}
                                {bet.games.map((game, gameIndex) => {
                                    const statusClass =
                                        game.status === "won"
                                            ? "text-green-500"
                                            : game.status === "lost"
                                            ? "text-red-500"
                                            : "text-gray-400";
                                    // inducePoll()
                                    return (
                                        <div
                                            key={gameIndex}
                                            className={`mb-4 border-b border-slate-700 pb-2 ${statusClass}`}
                                        >
                                            <p>
                                                {game.home_team} vs{" "}
                                                {game.away_team}
                                            </p>
                                            <p>
                                                Date:{" "}
                                                {new Date(
                                                    game.commence_time
                                                ).toLocaleString()}
                                            </p>
                                            <p>Odds: {game.odds}</p>
                                            <p>
                                                <strong>Prediction:</strong>{" "}
                                                {game.prediction}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {game.status}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-sm mt-4">
                                <strong>Stake:</strong> {bet.bet_amount} Credits
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBets;

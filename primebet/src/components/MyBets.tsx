import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase.config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface Game {
  sport_title: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  odds: number;
  result: "won" | "lost" | "unsettled";
  prediction: string;
}

interface Bet {
  status: "settled" | "unsettled";
  bet_amount: number;
  odds: number;
  games: Game[];
}

const MyBets: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"unsettled" | "settled" | "lost">("unsettled");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBetsForUser = async () => {
      setLoading(true);

      try {
        const user = auth.currentUser;

        if (!user) {
          setBets([]);
          setLoading(false);
          return;
        }

        let betsQuery;

        if (filter === "lost") {
          betsQuery = query(
            collection(db, "bets"),
            where("status", "==", "settled"),
            where("result", "==", "lost"),
            orderBy("commence_time", "desc")
          );
        } else {
          betsQuery = query(
            collection(db, "bets"),
            where("status", "==", filter),
            orderBy("commence_time", "desc")
          );
        }

        const querySnapshot = await getDocs(betsQuery);
        const fetchedBets: Bet[] = querySnapshot.docs.map((doc) => doc.data() as Bet);
        setBets(fetchedBets);
      } catch (error) {
        console.error("Error fetching bets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBetsForUser();
  }, [filter]);

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 flex flex-col items-center">
      <div className="flex items-center justify-between w-2/3 mt-6 mb-4">
        <h1 className="text-2xl font-bold">
          {filter === "settled" ? "Rozliczone Zakłady" : filter === "lost" ? "Przegrane Zakłady" : "Aktywne Zakłady"}
        </h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-slate-800 text-slate-100 px-4 py-2 rounded-md flex items-center gap-2"
          >
            {filter === "settled" ? "Rozliczone" : filter === "lost" ? "Przegrane" : "Aktywne"}
            <span className={`${dropdownOpen ? "rotate-180" : ""} transition-transform`}>▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 bg-slate-800 shadow-lg rounded-md overflow-hidden w-full">
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-slate-700 ${
                  filter === "unsettled" ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  setFilter("unsettled");
                  setDropdownOpen(false);
                }}
              >
                Aktywne
              </button>
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-slate-700 ${
                  filter === "settled" ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  setFilter("settled");
                  setDropdownOpen(false);
                }}
              >
                Rozliczone
              </button>
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-slate-700 ${
                  filter === "lost" ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  setFilter("lost");
                  setDropdownOpen(false);
                }}
              >
                Przegrane
              </button>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : bets.length === 0 ? (
        <p>Brak zakładów do wyświetlenia</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-2/3">
          {bets.map((bet, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-4 shadow-md flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold mb-2">
                Zakład Kombinacyjny (Łączny kurs: {bet.odds})
              </h2>
              <div className="text-sm text-slate-400">
                {bet.games.map((game, gameIndex) => (
                  <div key={gameIndex} className="mb-4 border-b border-slate-700 pb-2">
                    <p>
                      <strong>{game.sport_title}:</strong> {game.home_team} vs {game.away_team}
                    </p>
                    <p>Data: {new Date(game.commence_time).toLocaleString()}</p>
                    <p>Kurs: {game.odds}</p>
                    <p>
                      <strong>Typ:</strong> {game.prediction}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4">
                <strong>Stawka:</strong> {bet.bet_amount}€
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBets;
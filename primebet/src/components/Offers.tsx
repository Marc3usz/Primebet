import { useParams } from "react-router-dom";
import { fetchMap } from "../constants/fetch";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { userData, Bet } from "../stores/store";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.config";

const bookmakerPriority = ["betsson", "nordicbet", "sports888"];

export const Offers = () => {
  const { filter } = useParams<{ filter: string }>();
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const liveUserData = useStore(userData);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToBetslip = (
    bet: Bet,
    outcome: { name: string; price: number }
  ) => {
    liveUserData.appendBetslip({
      ...bet,
      desc: `${bet.desc} - Bet on: ${outcome.name}`,
      odds: outcome.price,
    });
  };

  const handleSendBetsToFirebase = async () => {
    if (!auth.currentUser) {
      setNotification("You must be logged in to send the betslip.");
      return;
    }

    try {
      const userBetsRef = collection(db, `Users/${auth.currentUser.uid}/bets`);
      const betData = {
        games: liveUserData.betslip,
        status: "unsettled",
        totalOdds: liveUserData.betslip.reduce((acc, bet) => acc * bet.odds, 1),
        bet_amount: liveUserData.betslip.length * 10,
      };

      await addDoc(userBetsRef, betData);

      liveUserData.setCredits(liveUserData.credits - betData.bet_amount);
      liveUserData.emptyBetslip();
      setNotification("Bets successfully added.");
    } catch (error) {
      console.error("Error sending betslip to Firebase:", error);
      setNotification("An error occurred while sending the betslip.");
    }
  };

  const getTopBookmaker = (bookmakers: any[]) => {
    return bookmakers.find((bookmaker: any) =>
      bookmakerPriority.includes(bookmaker.key)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!filter) {
        setErrorMessage("No filter provided");
        setLoading(false);
        return;
      }

      try {
        const res = await fetchMap[filter]?.();
        const filteredResults = res?.data?.filter((game: any) =>
          game.bookmakers.some((bookmaker: any) =>
            bookmakerPriority.includes(bookmaker.key)
          )
        );

        setQueryResults(filteredResults || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching offers:", err);
        setErrorMessage("Error: Bets couldn't load");
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 overflow-y-auto">
      {notification && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transition-all opacity-100">
          {notification}
        </div>
      )}
      
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg opacity-100">
          Loading Offers...
        </div>
      ) : errorMessage ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg opacity-100">
          {errorMessage}
        </div>
      ) : (
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {`${filter} Offers`}
        </h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {queryResults.map((game: any) => {
          const topBookmaker = getTopBookmaker(game.bookmakers);
          if (!topBookmaker) return null;

          return (
            <div
              key={game.id}
              className="bg-slate-800 rounded-lg p-4 shadow-md"
            >
              <h3 className="text-white text-lg font-bold">
                {game.sport_title}
              </h3>
              <p className="text-gray-400">
                {game.home_team} vs {game.away_team}
              </p>
              <p className="text-gray-400">
                Commence Time:{" "}
                {new Date(game.commence_time).toLocaleString()}
              </p>
              <div className="mt-4">
                {topBookmaker.markets[0].outcomes.map(
                  (outcome: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAddToBetslip(
                          {
                            title: `${game.home_team} vs ${game.away_team}`,
                            desc: topBookmaker.title,
                            date: new Date(
                              game.commence_time
                            ).getTime(),
                            odds: 0,
                          },
                          outcome
                        )
                      }
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                    >
                      {outcome.name} (Odds: {outcome.price})
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
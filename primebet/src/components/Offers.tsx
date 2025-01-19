import { useParams } from "react-router-dom";
import { fetchMap } from "../constants/fetch";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { userData, Bet } from "../stores/store";

const bookmakerPriority = ["betsson", "nordicbet", "sports888"];

export const Offers = () => {
    const { filter } = useParams<{ filter: string }>();
    const [queryResults, setQueryResults] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const liveUserData = useStore(userData);
    const [notification, setNotification] = useState<string | null>(null);
  
    const handleAddToBetslip = (
      game: any,
      outcome: { name: string; price: number }
    ) => {
      const bet: Bet = {
        title: game.sport_title,
        desc: `${game.home_team} vs ${game.away_team}`,
        date: new Date(game.commence_time).getTime(),
        odds: outcome.price,
        id: game.id,
        outcome: outcome.name,
        bookmaker: game.bookmakers[0].title,
      };
    
      liveUserData.appendBetslip(bet);
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
          const filteredResults = res?.data?.filter?.((game: any) =>
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
      <div className="h-fit flex flex-col items-center w-full p-4 sm:p-6 lg:p-20">
  {notification && (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transition-all opacity-100 h-fit">
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
    <h1 className="text-2xl font-bold mb-4 capitalize text-white">
      {filter === "recommended" ? "Recommended Offers" : `Offers for ${filter}`}
    </h1>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl h-fit">
    {queryResults.map((game: any) => {
      const topBookmaker = getTopBookmaker(game.bookmakers);
      if (!topBookmaker) return null;

      return (
        <div
          key={game.id}
          className="bg-slate-600 rounded-lg p-4 shadow-md min-h-fit"
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
                    handleAddToBetslip(game, outcome)
                  }
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  {outcome.name} ({outcome.price})
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
  
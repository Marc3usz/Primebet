import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface Bet {
  id: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmaker: string;
  bet_amount: number;
  odds: number;
  status: string;
}

interface User {
  uid: string;
  name: string;
  email: string;
}

const fetchUserData = async (uid: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as User) : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const MyBets: React.FC = () => {
  const { settled } = useParams<{ settled: string }>();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await fetchUserData(currentUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchBetsForUser = async () => {
      setLoading(true);
      try {
        const betsQuery = query(
          collection(db, "bets"),
          where("userId", "==", user.uid),
          where("status", "==", settled === "settled" ? "settled" : "unsettled"),
          orderBy("commence_time", "desc")
        );
        const querySnapshot = await getDocs(betsQuery);
        const fetchedBets: Bet[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Bet[];
        setBets(fetchedBets);
      } catch (error) {
        console.error("Error fetching bets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBetsForUser();
  }, [user, settled]);

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {settled === "settled" ? "Settled Bets" : "Unsettled Bets"}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : bets.length === 0 ? (
        <p>No bets found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="border border-slate-700 px-4 py-2">Sport</th>
              <th className="border border-slate-700 px-4 py-2">Teams</th>
              <th className="border border-slate-700 px-4 py-2">Date</th>
              <th className="border border-slate-700 px-4 py-2">Bookmaker</th>
              <th className="border border-slate-700 px-4 py-2">Amount</th>
              <th className="border border-slate-700 px-4 py-2">Odds</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet.id} className="hover:bg-slate-800">
                <td className="border border-slate-700 px-4 py-2">{bet.sport_title}</td>
                <td className="border border-slate-700 px-4 py-2">
                  {bet.home_team} vs {bet.away_team}
                </td>
                <td className="border border-slate-700 px-4 py-2">
                  {new Date(bet.commence_time).toLocaleString()}
                </td>
                <td className="border border-slate-700 px-4 py-2">{bet.bookmaker}</td>
                <td className="border border-slate-700 px-4 py-2">{bet.bet_amount}€</td>
                <td className="border border-slate-700 px-4 py-2">{bet.odds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBets;
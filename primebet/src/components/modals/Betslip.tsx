import { ScrollbarTailwindStyle } from "../../constants/Scrollstyle";
import { Bet } from "../../stores/store";
import { BetslipElement } from "../BetslipElement";
import { db, auth } from "../../firebase/firebase.config";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useStore } from "zustand";
import { userData } from "../../stores/store";
import { useState, useEffect } from "react";

export const Betslip = ({
  isVisible,
  onClose,
  clearBetslip,
  betslip,
}: {
  isVisible: boolean;
  onClose: () => void;
  clearBetslip: () => void;
  betslip: Bet[];
}) => {
  const liveUserData = useStore(userData);
  const [notification, setNotification] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [isCombinedBet, setIsCombinedBet] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleBetAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setBetAmount(value);
    }
  };

  const handleBetTypeChange = (type: "combined" | "single") => {
    setIsCombinedBet(type === "combined");
  };

  const handleSendBetsToFirebase = async () => {
    if (!auth.currentUser) {
      setNotification("You must be logged in to send the betslip.");
      return;
    }

    try {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setNotification("User data not found.");
        return;
      }

      const userData = userDoc.data();
      const availableCredits = userData?.credits;

      if (availableCredits < betAmount) {
        setNotification("Not enough credits to place the bet.");
        return;
      }

      const userBetsRef = collection(db, `Users/${auth.currentUser.uid}/bets`);
      const betData = {
        games: betslip,
        status: "unsettled",
        totalOdds: betslip.reduce((acc, bet) => acc * bet.odds, 1),
        bet_amount: betAmount,
        bet_type: isCombinedBet ? "combined" : "single",
      };

      await addDoc(userBetsRef, betData);

      await updateDoc(userRef, {
        credits: availableCredits - betAmount,
      });

      liveUserData.setCredits(availableCredits - betAmount);
      clearBetslip();
      setNotification("Bets successfully placed.");
    } catch (error) {
      console.error("Error sending betslip to Firebase:", error);
      setNotification("An error occurred while sending the betslip.");
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  let totalOdds = 1;
  for (const bet of betslip) {
    totalOdds *= bet.odds;
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-slate-800 shadow-md rounded-md w-full max-w-xs ${isMinimized ? "h-[50px]" : "h-[85vh]"} transition-all overflow-hidden flex flex-col`}>
      {notification && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transition-all opacity-100">
          {notification}
        </div>
      )}

      <div className="flex justify-between items-center mb-2 flex-row">
        <div className="w-fit flex gap-3 ml-2">
          <h3 className="text-lg font-semibold text-white">Betslip</h3>
          <p className="text-sm text-white bg-slate-600 p-2 rounded-md pb-0">
            {totalOdds.toFixed(2)}
          </p>
        </div>
        <div className="w-fit flex gap-3 mr-2">
          <button
            onClick={clearBetslip}
            className="text-white hover:text-slate-300"
          >
            X
          </button>
          <button
            onClick={toggleMinimize}
            className="text-white hover:text-slate-300"
          >
            {isMinimized ? "⮟" : "⮝"}
          </button>
        </div>
      </div>

      <div
        className={`flex-grow transition-all overflow-scroll flex flex-col gap-2 w-full max-h-[calc(75vh)] overflow-x-visible ${isMinimized ? "hidden" : ""}`}
      >
        {betslip.map((bet, index) => (
          <div key={bet.title + bet.date} className="flex items-center mb-3">
            <BetslipElement bet={bet} />
            {isCombinedBet ? null : (
              <div className="ml-4 w-full">
                <label className="text-white text-sm">Bet for {bet.title}:</label>
                <input
                  type="number"
                  onChange={(e) => {
                    const amount = parseInt(e.target.value, 10);
                    if (!isNaN(amount)) {
                    }
                  }}
                  className="ml-2 p-2 bg-slate-600 text-white rounded-md w-32"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {isCombinedBet && !isMinimized ? (
        <div className="mt-4 flex justify-center">
          <label className="text-white text-sm">Total Bet Amount:</label>
          <input
            type="number"
            value={betAmount}
            onChange={handleBetAmountChange}
            className="ml-2 p-2 bg-slate-600 text-white rounded-md w-32"
          />
        </div>
      ) : null}

      {!isMinimized && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex justify-between">
            <button
              onClick={() => handleBetTypeChange("single")}
              className={`w-1/2 py-2 rounded-md text-white ${!isCombinedBet ? "bg-blue-500" : "bg-slate-600"}`}
            >
              Single Bet
            </button>
            <button
              onClick={() => handleBetTypeChange("combined")}
              className={`w-1/2 py-2 rounded-md text-white ${isCombinedBet ? "bg-blue-500" : "bg-slate-600"}`}
            >
              Combined Bet
            </button>
          </div>
        </div>
      )}
      
      {!isMinimized && betslip.length > 0 && (
        <div>
          <button
            onClick={handleSendBetsToFirebase}
            className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Betslip to Firebase
          </button>
        </div>
      )}
    </div>
  );
};
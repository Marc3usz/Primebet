import { AppRouter } from "./routing/router";
import { Footer } from "./components/Footer";
import "./index.css";
import { ScrollbarTailwindStyle } from "./constants/Scrollstyle";
import { useEffect } from "react";
import { auth, db } from "./firebase/firebase.config";
import { useStore } from "zustand";
import { userData } from "./stores/store";
import { doc, onSnapshot } from "firebase/firestore";

function App() {
  const liveUserData = useStore(userData);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "Users", userId);
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          liveUserData.setCredits(userData?.credits ?? 0);
        }
      });
      return () => unsubscribe();
    }
  }, [auth.currentUser, liveUserData]);

  return (
    <div
      className={`flex flex-col-reverse w-full h-full ${ScrollbarTailwindStyle}`}
    >
      <div>
        <Footer />
      </div>
      <div className="flex h-full min-h-screen">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
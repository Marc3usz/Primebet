import { AppRouter } from "./routing/router";
import { Footer } from "./components/Footer";
import "./index.css";
import { ScrollbarTailwindStyle } from "./constants/Scrollstyle";
import { useEffect } from "react";
import {fetchUserData} from "./firebase/userdataFetcher"

function App() {
  useEffect(() => {
    fetchUserData()
  }, [])
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

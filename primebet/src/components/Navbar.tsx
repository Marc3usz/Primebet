import { useNavigate } from "react-router-dom";
import { Links } from "../constants/links";
import { useStore } from "zustand";
import { userData } from "../stores/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Logo2 from "../images/Logo2-rm.png";

export const Navbar = () => {
  const nav = useNavigate();
  const liveUserData = useStore(userData);

  const handleSignOut = async () => {
    liveUserData.setLoggedIn(false);
    await signOut(auth);
    nav(Links.HOMEPAGE);
  };

  const loginSignoutFN = liveUserData.loggedIn
    ? handleSignOut
    : () => nav(Links.LOGIN);

  const loginSignout = liveUserData.loggedIn ? "Sign Out" : "Log In";

  return (
    <div className="h-24 bg-slate-800 flex text-slate-100 justify-between items-center px-6 shadow-lg">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => nav(Links.HOMEPAGE)}
      >
        <img src={Logo2} alt="Logo" className="h-20 w-auto" />
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={() => nav(Links.BETS)}
          className="bg-slate-700 hover:bg-slate-600 rounded-full px-6 py-2 transition-all text-white font-medium"
        >
          My Bets
        </button>
        <button
          onClick={loginSignoutFN}
          className="bg-slate-700 hover:bg-slate-600 rounded-full px-6 py-2 transition-all text-white font-medium"
        >
          {loginSignout}
        </button>
        {liveUserData.loggedIn ? (
          <span className="ml-4 text-sm text-gray-300">
            credits: {liveUserData.credits}
          </span>
        ) : (
          <span className="ml-4 text-sm text-gray-300">
            Please log in to view credits
          </span>
        )}
      </div>
    </div>
  );
};
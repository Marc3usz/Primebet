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
<div className="h-24 bg-slate-800 flex text-slate-100 justify-between items-center px-4 md:px-6 shadow-lg w-full pb-1 pt-1">
  <div
    className="flex items-center cursor-pointer shrink-0"
    onClick={() => nav(Links.HOMEPAGE)}
  >
    <img src={Logo2} alt="Logo" className="h-14 md:h-20 w-auto" />
  </div>

  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
    <button
      onClick={() => nav(Links.BETS)}
      className="bg-slate-700 hover:bg-slate-600 rounded-full px-3 py-1 text-xs md:px-5 md:py-2 md:text-sm transition-all text-white font-medium"
    >
      My Bets
    </button>
    <button
      onClick={loginSignoutFN}
      className="bg-slate-700 hover:bg-slate-600 rounded-full px-3 py-1 text-xs md:px-5 md:py-2 md:text-sm transition-all text-white font-medium"
    >
      {loginSignout}
    </button>
    {liveUserData.loggedIn ? (
      <span className="text-xs md:text-sm text-gray-300">
        credits: {liveUserData.credits}
      </span>
    ) : (
      <span className="text-xs md:text-sm text-gray-300">
        Please log in to view credits
      </span>
    )}
  </div>
</div>

  );
};
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userData } from "../stores/store";
import { Modals } from "../constants/modals";
import Register from "../components/modals/Register";
import ForgotPass from "../components/modals/ForgotPass";
import { auth } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Links } from "../constants/links";
import { showAlert } from "../components/modals/CustomAlert";
// logowanie po prostu
export const LoginPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // gdzies musielismy to zrobic, wiec modale dodalismy
  const { modal, setModal, setLoggedIn } = userData();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam && Object.values(Modals).includes(modalParam as Modals)) {
      setModal(modalParam as Modals);
      setIsModalVisible(true);
    } else {
      setModal(Modals.NONE);
      setIsModalVisible(false);
    }
  }, [searchParams, setModal]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setLoggedIn(true);
      await showAlert(true, "Logged in successfully!")
      nav(Links.REDIRECT);
    } catch (err) {
      setError("Failed to log in. Please check your email and password.");
    }
  };

  const openModal = (targetModal: Modals) => {
    setModal(targetModal);
    setSearchParams({ modal: targetModal });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setModal(Modals.NONE);
      searchParams.delete("modal");
      setSearchParams(searchParams);
    }, 300);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white w-full px-4">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            <button
              className="text-blue-400 hover:underline"
              onClick={() => openModal(Modals.FORGOTPASS)}
            >
              Forgot Password?
            </button>
          </p>
          <p>
            Don't have an account?{" "}
            <button
              className="text-blue-400 hover:underline"
              onClick={() => openModal(Modals.REGISTER)}
            >
              Register
            </button>
          </p>
        </div>
      </div>
{/* modal handling */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`relative bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md transition-transform duration-300 ${
              isModalVisible ? "scale-100" : "scale-90"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            {modal === Modals.REGISTER && <Register />}
            {modal === Modals.FORGOTPASS && <ForgotPass />}
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userData } from "../stores/store";
import { Modals } from "../constants/modals";
import Register from "../components/modals/Register";
import ForgotPass from "../components/modals/ForgotPass";

export const LoginPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { modal, setModal } = userData();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
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

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div
            className={`relative bg-gray-800 text-white rounded-lg shadow-lg w-[400px] transition-transform duration-300 ${
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

export default LoginPage;
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { userData } from "../stores/store";
import { Modals } from "../constants/modals";
import Login from "../components/modals/Login";
import Register from "../components/modals/Register";
import ForgotPass from "../components/modals/ForgotPass";

export const LoginPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { modal, setModal } = userData();

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam && Object.values(Modals).includes(modalParam as Modals)) {
      setModal(modalParam as Modals);
    } else {
      setModal(Modals.NONE);
    }
  }, [searchParams, setModal]);

  const closeModal = () => {
    setModal(Modals.NONE);
    searchParams.delete("modal");
    setSearchParams(searchParams);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {modal !== Modals.NONE && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-gray-800 text-white rounded-lg shadow-lg w-[400px]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            {modal === Modals.LOGIN && <Login />}
            {modal === Modals.REGISTER && <Register />}
            {modal === Modals.FORGOTPASS && <ForgotPass />}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
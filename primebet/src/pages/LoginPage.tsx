import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { userData } from "../stores/store";
import { Modals } from "../constants/modals";
import Login from "../components/modals/Login";
import Register from "../components/modals/Register";
import ForgotPass from "../components/modals/ForgotPass";

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { modal, setModal } = userData();

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam && Object.values(Modals).includes(modalParam as Modals)) {
      setModal(modalParam as Modals);
    } else {
      setModal(Modals.NONE);
    }
  }, [searchParams, setModal]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

      <div className="flex flex-col items-center mt-10">
        <button
          onClick={() => setModal(Modals.LOGIN)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>

      {modal === Modals.LOGIN && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <button
              onClick={() => setModal(Modals.NONE)}
              className="text-gray-500 hover:text-black float-right"
            >
              &times;
            </button>
            <Login closeModal={() => setModal(Modals.NONE)} />
          </div>
        </div>
      )}

      {modal === Modals.REGISTER && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <button
              onClick={() => setModal(Modals.NONE)}
              className="text-gray-500 hover:text-black float-right"
            >
              &times;
            </button>
            <Register closeModal={() => setModal(Modals.NONE)} />
          </div>
        </div>
      )}

      {modal === Modals.FORGOTPASS && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <button
              onClick={() => setModal(Modals.NONE)}
              className="text-gray-500 hover:text-black float-right"
            >
              &times;
            </button>
            <ForgotPass closeModal={() => setModal(Modals.NONE)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
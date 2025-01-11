import React from "react";
import { userData } from "../../stores/store";
import { Modals } from "../../constants/modals";

const ForgotPass: React.FC = () => {
  const { setModal } = userData();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
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
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
        >
          Reset Password
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Remembered your password?{" "}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setModal(Modals.LOGIN)}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass;
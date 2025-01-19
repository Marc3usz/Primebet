import React, { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { showAlert } from "./CustomAlert";
// modal na reset hasla (akurat faktycznie dziala, tylko ze trzeba prawdziwego maila wpisac)
const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      await showAlert(true, "Password reset successfully!")
    } catch (err: any) {
      err.message ? setError(err.message) : showAlert(false, "Unknown error, please retry");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Password reset email sent!</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
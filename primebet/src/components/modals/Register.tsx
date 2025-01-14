import React, { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Links } from "../../constants/links";
import TOS from "./TOS";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [acceptTOS, setAcceptTOS] = useState(false);
  const [isTOSOpen, setIsTOSOpen] = useState(false);

  const nav = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      nav(Links.HOMEPAGE);
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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
        <div>
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={acceptTOS}
              onChange={(e) => setAcceptTOS(e.target.checked)}
            />
            Akceptuję{" "}
            <span
              className="text-blue-500 underline cursor-pointer ml-1"
              onClick={() => setIsTOSOpen(true)}
            >
              regulamin
            </span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">Registration successful!</p>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-bold ${
            acceptTOS
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!acceptTOS}
        >
          Register
        </button>
      </form>

      {isTOSOpen && <TOS onClose={() => setIsTOSOpen(false)} />}
    </div>
  );
};

export default Register;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Links } from "../constants/links";

export const RedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(Links.HOMEPAGE);
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white w-full">
      <h1 className="text-2xl font-bold">Redirecting to main page...</h1>
      <p className="text-gray-400 mt-2">Please wait a moment.</p>
    </div>
  );
};
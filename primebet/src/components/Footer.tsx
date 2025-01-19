import React from "react";
import Logo888 from "../images/888sport-logo.png";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 border-slate-800 py-4 text-center flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 z-100 w-full">
            <div className="mb-2 md:mb-0">
                <img
                    src={Logo888}
                    alt="888sport Logo"
                    className="mx-auto w-16 md:w-20 h-auto"
                />
            </div>
            <p className="text-xs md:text-sm text-slate-100 px-4 md:px-0">
                Bookmaking provided by 888sport via{" "}
                <a
                    href="https://the-odds-api.com"
                    target="_blank"
                    className="text-blue-300 hover:underline"
                >
                    the-odds-api
                </a>
            </p>
        </footer>
    );
};

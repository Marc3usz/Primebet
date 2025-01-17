import React from "react";
import Logo888 from "../images/888sport-logo.png";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-800 border-slate-800 border-5-2 py-4 text-center flex flex-row justify-center items-center h-fit gap-10">
            <div className="mb-0">
                <img
                    src={Logo888}
                    alt="888sport Logo"
                    className="mx-auto w-20 h-auto"
                />
            </div>
            <p className="text-sm text-slate-100">
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

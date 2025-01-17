import React from 'react';
import Logo888 from "../images/888sport-logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-4 text-center">
      <div className="mb-2">
        <img
          src={Logo888}
          alt="888sport Logo"
          className="mx-auto w-20 h-auto"
        />
      </div>
      <p className="text-sm text-gray-700">
        Bookmaking provided by 888sport via{' '}
        <a
          href="https://the-odds-api.com"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          the-odds-api
        </a>
      </p>
    </footer>
  );
};

export default Footer;
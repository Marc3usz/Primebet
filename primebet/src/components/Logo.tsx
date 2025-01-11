import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="/logopath.png"
      />
    </Link>
  );
};

export default Logo;
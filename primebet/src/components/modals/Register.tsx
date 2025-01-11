import React from "react";

const Register: React.FC = () => {
  return (
    <div className="register-form">
      <h2>Register</h2>
      <form>
        <label>
          Name:
          <input type="text" placeholder="Enter your name" required />
        </label>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" required />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Enter your password" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
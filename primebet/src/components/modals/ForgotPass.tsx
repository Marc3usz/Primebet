import React from "react";

const ForgotPass: React.FC = () => {
  return (
    <div className="forgot-pass-form">
      <h2>Forgot Password</h2>
      <form>
        <label>
          Email:
          <input type="email" placeholder="Enter your email" required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPass;
import React from "react";

interface ForgotPassProps {
  closeModal: () => void;
}

const ForgotPass: React.FC<ForgotPassProps> = ({ closeModal }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={closeModal} className="modal-close">
          &times;
        </button>
        <h2>Forgot Password</h2>
        <form>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" required />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
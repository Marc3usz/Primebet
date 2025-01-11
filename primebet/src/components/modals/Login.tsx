import React from "react";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={closeModal} className="modal-close">
          &times;
        </button>
        <h2>Login</h2>
        <form>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" required />
          </label>
          <label>
            Password:
            <input type="password" placeholder="Enter your password" required />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/login?modal=register" onClick={(e) => e.preventDefault()}>
            Register
          </a>
        </p>
        <p>
          Forgot your password?{" "}
          <a href="/login?modal=forgotpass" onClick={(e) => e.preventDefault()}>
            Reset it
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
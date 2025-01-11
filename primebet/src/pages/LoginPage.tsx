import React, {useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { userData, UserData } from '../stores/store';
import { Modals } from '../constants/modals';

const LoginPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { modal, setModal } = userData();

    useEffect(() => {
        const modalParam = searchParams.get('modal');
        if (modalParam && Object.values(Modals).includes(modalParam as Modals)) {
            setModal(modalParam as Modals);
        } else {
            setModal(Modals.NONE);
        }
    }, [searchParams, setModal]);

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                {modal === Modals.NONE && (
                    <form className="login-form">
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
                )}

                {modal === Modals.REGISTER && (
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
                        </form>
                    </div>
                )}

                {modal === Modals.FORGOTPASS && (
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
                )}

                <div className="login-footer">
                    {modal !== Modals.REGISTER && (
                        <p>
                            Don't have an account? <a href="/login?modal=register">Register</a>
                        </p>
                        )}
                    {modal !== Modals.FORGOTPASS && (
                        <p>
                            Forgot your password? <a href="/login?modal=forgotpass">Reset it</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
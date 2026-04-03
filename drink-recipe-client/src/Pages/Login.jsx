import LoginForm from "../Components/LoginForm";
import { useState } from "react";
import SignupForm from "../Components/SignupForm";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css" 

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    const navigate = useNavigate();

    const handleLogin = (token, user) => {
        localStorage.setItem("token", token);
        onLogin(token, user);
        navigate("/");
    }
    return (
        <div>
            <h1 className="login-title">Welcome to Sláinte</h1>
            {showLogin ? (
                <>
                <LoginForm className="login-form" onLogin={handleLogin} />
                <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
            ) : (
                <>
                <SignupForm className="signup-form" onLogin={handleLogin} />
                <button onClick={() => setShowLogin(true)}>Back to Login</button>
                </>
            )}
        </div>
    );
}

export default Login;
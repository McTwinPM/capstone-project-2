import LoginForm from "../Components/LoginForm";
import { use, useState } from "react";
import SignupForm from "../Components/SignupForm";
import { useNavigate } from "react-router-dom";

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
            {showLogin ? (
                <>
                <LoginForm onLogin={handleLogin} />
                <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
            ) : (
                <>
                <SignupForm onLogin={handleLogin} />
                <button onClick={() => setShowLogin(true)}>Back to Login</button>
                </>
            )}
        </div>
    );
}

export default Login;
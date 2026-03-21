import LoginForm from "../Components/LoginForm";
import { useState } from "react";
import SignupForm from "../Components/SignupForm";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div>
            {showLogin ? (
                <>
                <LoginForm onLogin={onLogin} />
                <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </>
            ) : (
                <>
                <SignupForm onLogin={onLogin} />
                <button onClick={() => setShowLogin(true)}>Back to Login</button>
                </>
            )}
        </div>
    );
}

export default Login;
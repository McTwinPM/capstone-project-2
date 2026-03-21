import LoginForm from "../Components/LoginForm";
import { useState } from "react";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div>
            {showLogin ? (
                <LoginForm onLogin={onLogin} />
                

            ) : (
                <p>Registration form coming soon...</p>
            )}
        </div>
    );
}

export default Login;
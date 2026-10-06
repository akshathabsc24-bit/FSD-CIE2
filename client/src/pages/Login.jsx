import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        alert("Login successful!");

        navigate("/dashboard");
    };

    return (
        <div className="container">

            <div className="auth-container">

                <h1>🔐 Login</h1>

                <p>Welcome back to RecipeHub!</p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-recipe-button"
                    >
                        🔐 Login
                    </button>

                </form>

                <p style={{ marginTop: "20px" }}>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
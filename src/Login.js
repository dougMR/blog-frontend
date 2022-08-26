import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import APIUrl from "./APIUrl";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isNewUser = searchParams.get("newUser");
    const passwordHasBeenReset = searchParams.get("passwordReset");

    const login = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch(`${APIUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                credentials : "include"
            });
            const data = await response.json();
            if(data.error){
                setError(data.error);
            } else {
                setError("");
                // redirect to Admin, login successful
                navigate("/admin");
            }
            console.log(data);
        } catch (error) {
            setError(`Login API call failed. ERROR: ${error}`);
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Login</h1>
            {isNewUser && <p>Your account has been created. Please log in.</p>}
            {passwordHasBeenReset && (
				<p>Your password has been reset. Give it a spin, log in.</p>
			)}
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(evt) => {
                            setUsername(evt.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(evt) => {
                            setPassword(evt.target.value);
                        }}
                    />
                </div>
                <p style={{ color: "red" }}>{error}</p>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <Link to="/create-account" className="btn btn-primary" style={{marginLeft: "1em"}}>Create New Account</Link>
                <Link to="/reset-password" className="btn btn-primary" style={{marginLeft: "1em"}}>Forgot Password</Link>
            </form>
        </div>
    );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIUrl from "./APIUrl";
const CreateAccount = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const createAccount = async (evt) => {
        evt.preventDefault();
        try {
            const response = await fetch(`${APIUrl}/create-account`, {
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
                // redirect to Admin, createAccount successful
                navigate("/login?newUser=true");
            }
            console.log(data);
        } catch (error) {
            setError(`/create-account API call failed. ERROR: ${error}`);
            console.error(error);
        }
    };
    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={createAccount}>
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
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;

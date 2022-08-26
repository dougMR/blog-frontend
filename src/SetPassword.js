import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import APIUrl from "./APIUrl";

const SetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [queryParams, setQueryParams] = useSearchParams();
    const navigate = useNavigate();
    const resetToken = queryParams.get("token");

    const formSubmitted = async (evt) => {
        evt.preventDefault();
        if (password !== confirmPassword) {
            alert("Your passwords don't match. Try again!");
        } else if (!password) {
            alert("Your password can't be empty.");
        } else {
            // reset password API call goes here
            const response = await fetch(`${APIUrl}/set-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({ password, resetToken }),
            });
            const data = await response.json();
			if (data.error) {
				alert(data.error);
			} else {
				navigate("/login?passwordReset=true");
			}
        }
    };
    return (
        <div>
            <h1>Set Password</h1>
            {resetToken}
            <form onSubmit={formSubmitted}>
                <label>Enter New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(evt) => {
                        setPassword(evt.target.value);
                    }}
                />
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(evt) => {
                        setConfirmPassword(evt.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "0.5rem" }}
                >
                    Set Password
                </button>
            </form>
        </div>
    );
};

export default SetPassword;

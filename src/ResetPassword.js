import APIUrl from "./APIUrl";
import { useState } from "react";
const ResetPassword = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const sendPasswordResetEmail = async (evt) => {
        evt.preventDefault();
        console.log("calling /reset-password...");
        const response = await fetch(`${APIUrl}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailAddress,
            }),
        });
        const data  = await response.json();
        console.log("data: ",data);
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={sendPasswordResetEmail}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    name=""
                    id="password"
                    value={emailAddress}
                    onChange={(evt) => {
                        setEmailAddress(evt.target.value);
                    }}
                />
                <button className="btn btn-primary" style={{marginTop: "1em"}} type="submit">Send Email</button>
            </form>
        </div>
    );
};

export default ResetPassword;

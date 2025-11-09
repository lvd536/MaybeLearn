import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../utils/profile";
import { Input } from "../../components/Auth/";

export default function ResetPassword() {
    const [email, setEmail] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleSubmit = () => {
        resetPassword(email);
        alert("Check your email! If email is correct you will see message");
    };
    return (
        <div className="absolute flex flex-col bottom-0 right-0 h-full w-full items-center justify-center gap-15 -z-1">
            <h1 className="font-medium text-xl">Change your password</h1>
            <form
                action=""
                className="flex flex-col gap-10"
                onSubmit={handleSubmit}
            >
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    minLength={6}
                    onChange={handleChange}
                    value={email}
                />
                <button
                    type="submit"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                >
                    Change password
                </button>
                <span className="flex gap-2 mt-5 justify-center">
                    Remembered the password?
                    <Link to="/login" className="text-indigo-500">
                        Log In
                    </Link>
                </span>
            </form>
        </div>
    );
}

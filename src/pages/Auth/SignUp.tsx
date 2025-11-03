import { useState } from "react";
import type { IRegisterForm } from "../../types";
import { client } from "../../services/supabase";
import { Link } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState<IRegisterForm>({
        username: "",
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        client.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    username: formData.username,
                },
            },
        });
        alert("Confirm your email");
        window.location.reload();
    };

    return (
        <div className="absolute flex flex-col bottom-0 right-0 h-full w-full items-center justify-center -z-1">
            <form
                action=""
                className="flex flex-col items-center justify-between mt-10 gap-5"
                onSubmit={handleSubmit}
            >
                <input
                    type="mail"
                    name="email"
                    placeholder="Enter your email"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                    required
                    minLength={6}
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                    required
                    minLength={6}
                    onChange={handleChange}
                    value={formData.username}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                    required
                    minLength={8}
                    onChange={handleChange}
                    value={formData.password}
                />
                <button
                    type="submit"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                >
                    Register
                </button>
            </form>
            <span className="flex gap-2 mt-5 justify-center">
                Don't have an account?{" "}
                <Link to="/login" className="text-indigo-500">
                    Sign In
                </Link>
            </span>
        </div>
    );
}

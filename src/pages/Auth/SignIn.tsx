import { useState } from "react";
import type { ISignInForm } from "../../types";
import { client } from "../../services/supabase";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState<ISignInForm>({
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
        client.auth
            .signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            .then(() => {
                window.location.reload();
            });
    };

    return (
        <div className="absolute flex flex-col bottom-0 right-0 h-full w-full items-center justify-center -z-1">
            <form
                action=""
                className="flex flex-col items-center justify-between gap-5"
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
                    SignIn
                </button>
            </form>
            <span className="flex gap-2 mt-5 justify-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-500">
                    Sign Up
                </Link>
            </span>
        </div>
    );
}

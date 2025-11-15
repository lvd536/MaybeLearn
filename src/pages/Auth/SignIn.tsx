import { useEffect, useState } from "react";
import type { ISignInForm } from "../../types";
import { client } from "../../services/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Auth/";
import { useAuthStore } from "../../stores/useAuthStore";

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
        client.auth
            .signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
    };
    const profile = useAuthStore((state) => state.profile);
    const navigate = useNavigate();
    useEffect(() => {
        if (profile) {
            navigate("/profile");
        }
    }, [profile, navigate]);
    return (
        <div className="absolute flex flex-col bottom-0 right-0 h-full w-full items-center justify-center -z-1">
            <form
                action=""
                className="flex flex-col items-center justify-between gap-5"
                onSubmit={handleSubmit}
            >
                <Input
                    type="mail"
                    name="email"
                    placeholder="Enter your email"
                    minLength={6}
                    onChange={handleChange}
                    value={formData.email}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    minLength={8}
                    onChange={handleChange}
                    value={formData.password}
                />
                <span className="flex gap-2 mt-5 justify-center">
                    Forgot your password?
                    <Link to="/resetPassword" className="text-indigo-500">
                        Reset Password
                    </Link>
                </span>
                <button
                    type="submit"
                    className="ring-1 ring-indigo-500 rounded-xs p-2"
                >
                    SignIn
                </button>
            </form>
            <span className="flex gap-2 mt-5 justify-center">
                Don't have an account?
                <Link to="/register" className="text-indigo-500">
                    Sign Up
                </Link>
            </span>
        </div>
    );
}

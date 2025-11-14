import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useAuthStore } from "../../stores/useAuthStore";
import { Burger } from "../../assets";
import { useState } from "react";

export default function NavBar() {
    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const isUser = useAuthStore((state) => state.user) || null;
    return (
        <div className="mb-25">
            <div className="fixed top-0 left-0 px-10 flex items-center justify-between w-screen h-17 border-b border-b-white bg-dark-bg/95 z-100">
                <NavLink to="/" className="flex items-center gap-4">
                    <Logo />
                    <span className="font-bold text-xl">MaybeLearn</span>
                </NavLink>
                <div className="hidden sm:block">
                    <ul className="flex items-center gap-9">
                        <NavLink to="/catalog/courses">Courses</NavLink>
                        <NavLink to="/catalog/tests">Tests</NavLink>
                        <NavLink to="/rating">Rating</NavLink>
                        {isUser ? (
                            <NavLink
                                to={"/profile"}
                                className="flex w-21 h-10 font-bold bg-indigo-500 rounded-xl items-center justify-center"
                            >
                                Profile
                            </NavLink>
                        ) : (
                            <div className="flex gap-2">
                                <NavLink
                                    to={"/login"}
                                    className="flex w-21 h-10 font-bold bg-indigo-500 rounded-xl items-center justify-center"
                                >
                                    Sign up
                                </NavLink>
                                <NavLink
                                    to={"/register"}
                                    className="flex w-21 h-10 font-bold bg-indigo-500/50 rounded-xl items-center justify-center"
                                >
                                    Log in
                                </NavLink>
                            </div>
                        )}
                    </ul>
                </div>
                <div
                    className="sm:hidden bg-button-background/45 rounded-sm p-1 z-1"
                    onClick={() => setIsBurgerOpen((prev) => !prev)}
                >
                    <Burger />
                </div>
                {isBurgerOpen && (
                    <div className="flex flex-col fixed top-0 left-0 w-screen h-screen items-center justify-center gap-9 bg-dark-bg/50">
                        <NavLink to="/catalog/courses" className={"text-3xl"}>
                            Courses
                        </NavLink>
                        <NavLink to="/catalog/tests" className={"text-3xl"}>
                            Tests
                        </NavLink>
                        <NavLink to="/rating" className={"text-3xl"}>
                            Rating
                        </NavLink>
                        {isUser ? (
                            <NavLink
                                to={"/profile"}
                                className="flex w-30 h-12 font-bold text-2xl bg-indigo-500 rounded-xl items-center justify-center"
                            >
                                Profile
                            </NavLink>
                        ) : (
                            <div className="flex gap-2">
                                <NavLink
                                    to={"/login"}
                                    className="flex w-30 h-12 font-bold text-2xl bg-indigo-500 rounded-xl items-center justify-center"
                                >
                                    Sign up
                                </NavLink>
                                <NavLink
                                    to={"/register"}
                                    className="flex w-30 h-12 font-bold text-2xl bg-indigo-500/50 rounded-xl items-center justify-center"
                                >
                                    Log in
                                </NavLink>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

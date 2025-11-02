import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo";

export default function NavBar() {
    return (
        <div className="mb-25">
            <div className="fixed top-0 left-0 px-10 flex items-center justify-between w-screen h-17 border-b border-b-white bg-dark-bg/95">
                <NavLink to="/" className="flex items-center gap-4">
                    <Logo />
                    <span className="font-bold text-xl">MaybeLearn</span>
                </NavLink>
                <div>
                    <ul className="flex items-center gap-9">
                        <NavLink to="/catalog/courses">Courses</NavLink>
                        <NavLink to="/catalog/tests">Tests</NavLink>
                        <NavLink to="/rating">Rating</NavLink>
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
                    </ul>
                </div>
            </div>
        </div>
    );
}

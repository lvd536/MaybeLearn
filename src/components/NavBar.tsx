import { Link } from "react-router-dom";
import Logo from "../assets/Logo";

export default function NavBar() {
    return (
        <div className="mb-25">
            <div className="fixed top-0 left-0 px-10 flex items-center justify-between w-screen h-17 border-b border-b-white bg-dark-bg/95">
                <Link to="/" className="flex items-center gap-4">
                    <Logo />
                    <span className="font-bold text-xl">MaybeLearn</span>
                </Link>
                <div>
                    <ul className="flex items-center gap-9">
                        <Link to="/catalog/courses">Courses</Link>
                        <Link to="/catalog/tests">Tests</Link>
                        <Link to="/rating">Rating</Link>
                        <div className="flex gap-2">
                            <Link
                                to={"/login"}
                                className="flex w-21 h-10 font-bold bg-indigo-500 rounded-xl items-center justify-center"
                            >
                                Sign up
                            </Link>
                            <Link
                                to={"/register"}
                                className="flex w-21 h-10 font-bold bg-indigo-500/50 rounded-xl items-center justify-center"
                            >
                                Log in
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

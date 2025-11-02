import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 px-10 flex items-center justify-between w-screen h-17 border-b border-b-white bg-dark-bg/95">
            <div className="flex items-center gap-4">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-4.06504e-05 8.14199e-05H4.44443V4.44455H8.88883V8.88895H13.3333V13.3334H-4.06504e-05V8.14199e-05Z"
                        fill="white"
                    />
                </svg>
                <span className="font-bold text-xl">MaybeLearn</span>
            </div>
            <div>
                <ul className="flex items-center gap-9">
                    <li>Courses</li>
                    <li>Tests</li>
                    <li>Rating</li>
                    <div className="flex gap-2">
                        <li>
                            <Link
                                to={"/login"}
                                className="flex w-21 h-10 font-bold bg-indigo-500 rounded-xl items-center justify-center"
                            >
                                Sign up
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/register"}
                                className="flex w-21 h-10 font-bold bg-indigo-500/50 rounded-xl items-center justify-center"
                            >
                                Log in
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
}

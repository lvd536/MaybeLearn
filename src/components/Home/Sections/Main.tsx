import { Link } from "react-router-dom";
import HomeCode from "../../../assets/HomeCode.png";
export default function Main() {
    return (
        <div className="mt-25 flex items-center justify-between">
            <img src={HomeCode} alt="" className="rounded-xl" />
            <div className="flex flex-col gap-6">
                <span className="font-black text-5xl">
                    Level up your coding skills
                </span>
                <span className="font-normal text-sm">
                    Master in-demand programming languages with our interactive
                    courses and challenges. Join a community of learners and
                    build your portfolio.
                </span>
                <div className="flex gap-2">
                    <Link
                        to={"/login"}
                        className="flex font-bold w-21 h-10 bg-indigo-500 rounded-xl items-center justify-center"
                    >
                        Sign up
                    </Link>
                    <Link
                        to={"/courses"}
                        className="flex font-bold w-35 h-10 bg-indigo-500/50 rounded-xl items-center justify-center"
                    >
                        Explore courses
                    </Link>
                </div>
            </div>
        </div>
    );
}

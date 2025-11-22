import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import ThemeToggle from "./ThemeToggle";

interface NavItemsProps {
    w: number;
    h: number;
    firstText: string;
    secondText: string;
}

export default function NavItems({
    w,
    h,
    firstText,
    secondText,
}: NavItemsProps) {
    const profile = useAuthStore((state) => state.profile);
    return (
        <>
            <ThemeToggle />
            <NavLink to="/catalog/courses" className={firstText}>
                Courses
            </NavLink>
            <NavLink to="/catalog/tests" className={firstText}>
                Tests
            </NavLink>
            <NavLink to="/rating" className={firstText}>
                Rating
            </NavLink>
            {profile ? (
                <NavLink
                    to={"/profile"}
                    className={`flex w-${w} h-${h} font-bold ${secondText} bg-indigo-500 rounded-xl items-center justify-center`}
                >
                    Profile
                </NavLink>
            ) : (
                <div className="flex gap-2">
                    <NavLink
                        to={"/login"}
                        className={`flex w-${w} h-${h} font-bold ${secondText} bg-indigo-500 rounded-xl items-center justify-center`}
                    >
                        Sign up
                    </NavLink>
                    <NavLink
                        to={"/register"}
                        className={`flex w-${w} h-${h} font-bold ${secondText} bg-indigo-500/50 rounded-xl items-center justify-center`}
                    >
                        Log in
                    </NavLink>
                </div>
            )}
        </>
    );
}

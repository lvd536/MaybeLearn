import { ProfileImage, Logout } from "../../assets/";
import { client } from "../../services/supabase";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link } from "react-router-dom";
import Button from "./Button";

type HeaderProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function Header({ onClick }: HeaderProps) {
    const profile = useAuthStore((state) => state.profile);
    const logOutHandler = () => {
        client.auth.signOut();
    };
    const profileColors = {
        text:
            profile?.role === "moderator"
                ? "text-yellow-400"
                : profile?.role === "admin"
                ? "text-red-500"
                : "bg-green-400",
        bg:
            profile?.role === "moderator"
                ? "text-yellow-400"
                : profile?.role === "admin"
                ? "bg-red-500"
                : "bg-green-400",
        textShadow:
            profile?.role === "moderator"
                ? "text-shadow-yellow-400"
                : profile?.role === "admin"
                ? "text-shadow-red-500"
                : "text-shadow-green-400",
    };
    return (
        <>
            {profile && (
                <div className="flex items-center justify-between mb-10">
                    <div className="flex gap-5">
                        <img
                            className="w-25 h-25 rounded-full"
                            src={profile.avatar_url || ProfileImage}
                            alt="Profile Image"
                        ></img>
                        <div className="flex flex-col justify-center">
                            <span
                                className={`font-bold text-2xl ${profileColors.text} text-shadow-lg ${profileColors.textShadow}`}
                            >
                                {profile.display_name}
                            </span>
                            <span className="font-normal text-base text-card">
                                {profile.createdAt}
                            </span>
                            <span className="font-normal text-base text-card">
                                {profile.bio}
                            </span>
                            <span
                                className={`flex items-center justify-center font-medium text-sm ${profileColors.bg} rounded-2xl p-0.5 mt-2`}
                            >
                                {profile.role}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <Link
                            to={"/admin"}
                            className="flex items-center justify-center h-10 w-50 p-2 bg-button-background rounded-sm hover:cursor-pointer"
                        >
                            Admin Panel
                        </Link>
                        <Button type="button" onClick={onClick}>
                            Edit Profile
                        </Button>
                        <Link
                            to={"/"}
                            className="flex items-center justify-center h-10 p-2 bg-button-background rounded-sm hover:cursor-pointer"
                            onClick={logOutHandler}
                        >
                            <Logout />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

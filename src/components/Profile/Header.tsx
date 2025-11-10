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
    const getNameColor = (type: "bg" | "text") => {
        if (profile?.role === "moderator") {
            return `${type}-yellow-400`;
        } else if (profile?.role === "admin") {
            return `${type}-red-500`;
        } else {
            return `${type}-green-400`;
        }
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
                                className={`font-bold text-2xl ${getNameColor(
                                    "text"
                                )} text-shadow-lg ${
                                    profile.role === "admin"
                                        ? "text-shadow-red-500"
                                        : profile.role === "moderator"
                                        ? "text-shadow-yellow-400"
                                        : "text-shadow-green-400"
                                }`}
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
                                className={`flex items-center justify-center font-medium text-sm ${getNameColor(
                                    "bg"
                                )} rounded-2xl p-0.5 mt-2`}
                            >
                                {profile.role}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <Link
                            to={"/admin"}
                            className="flex items-center justify-center h-10 w-50 p-2 bg-button-background rounded-sm hover:cursor-pointer"
                            onClick={logOutHandler}
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

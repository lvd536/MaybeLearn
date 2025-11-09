import ProfileImage from "../../assets/ProfileImage.png";
import { client } from "../../services/supabase";
import { useAuthStore } from "../../stores/useAuthStore";
import Logout from "../../assets/Logout";
import { Link } from "react-router-dom";
export default function Header({ onClick }: { onClick: () => void }) {
    const profile = useAuthStore((state) => state.profile);
    const logOutHandler = () => {
        client.auth.signOut();
    };
    return (
        <div className="flex items-center justify-between mb-10">
            <div className="flex gap-5">
                <img
                    className="w-25 h-25 rounded-full"
                    src={profile?.avatar_url || ProfileImage}
                    alt="Profile Image"
                ></img>
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-2xl">
                        {profile?.display_name || "Alex"}
                    </span>
                    <span className="font-normal text-base text-card">
                        {profile?.createdAt}
                    </span>
                    <span className="font-normal text-base text-card">
                        {profile?.bio ?? "bio: none"}
                    </span>
                </div>
            </div>
            <div className="flex gap-5">
                <button
                    className="flex items-center justify-center w-60 h-10 bg-button-background rounded-sm"
                    onClick={onClick}
                >
                    Edit Profile
                </button>
                <Link
                    to={"/"}
                    className="flex items-center justify-center h-10 p-2 bg-button-background rounded-sm hover:cursor-pointer"
                    onClick={logOutHandler}
                >
                    <Logout />
                </Link>
            </div>
        </div>
    );
}

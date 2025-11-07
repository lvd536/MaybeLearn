import ProfileImage from "../../assets/ProfileImage.png";
import { useAuthStore } from "../../stores/useAuthStore";
export default function Header({ onClick }: { onClick: () => void }) {
    const profile = useAuthStore((state) => state.profile);
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
            <button
                className="flex items-center justify-center w-120 h-10 bg-button-background rounded-xl"
                onClick={onClick}
            >
                Edit Profile
            </button>
        </div>
    );
}

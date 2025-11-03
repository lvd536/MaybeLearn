import ProfileImage from "../../assets/ProfileImage.png";
import { useAuthStore } from "../../stores/useAuthStore";
export default function Header() {
    const name = useAuthStore((state) => state.profile?.display_name);
    const id = useAuthStore((state) => state.profile?.id);
    return (
        <div className="flex items-center justify-between mb-10">
            <div className="flex gap-5">
                <img
                    className="w-25 h-25 rounded-full"
                    src={ProfileImage}
                    alt="Profile Image"
                ></img>
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-2xl">{name || "Alex"}</span>
                    <span className="font-normal text-base text-card">
                        Joined 2021
                    </span>
                    <span className="font-normal text-base text-card">
                        Id: {id}
                    </span>
                </div>
            </div>
            <button className="flex items-center justify-center w-120 h-10 bg-button-background rounded-xl">
                Edit Profile
            </button>
        </div>
    );
}

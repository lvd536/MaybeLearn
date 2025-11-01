import { useAuthStore } from "../../stores/useAuthStore";

export default function Profile() {
    const name = useAuthStore((state) => state.profile?.display_name);
    const id = useAuthStore((state) => state.profile?.id);
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex gap-5">
                    <div className="w-25 h-25 bg-gray-400 rounded-full"></div>
                    <div className="flex flex-col items-center justify-center text-xl font-bold">
                        <span>{name || "Alex"}</span>
                        <span>Joined 2021</span>
                        <span>Id: {id}</span>
                    </div>
                </div>
                <button className="flex items-center justify-center w-120 h-10 bg-button-background rounded-xs">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

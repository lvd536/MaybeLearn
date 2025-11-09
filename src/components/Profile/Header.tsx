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
                            <span className="font-bold text-2xl">
                                {profile.display_name}
                            </span>
                            <span className="font-normal text-base text-card">
                                {profile.createdAt}
                            </span>
                            <span className="font-normal text-base text-card">
                                {profile.bio}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-5">
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

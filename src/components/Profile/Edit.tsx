import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useState } from "react";
import { resetPassword, updateProfile } from "../../utils/profile";
import Button from "./Button";
import { useNotifyStore } from "../../stores/useNotifyStore";
interface IEditForm {
    display_name: string;
    bio: string;
    avatar_url: string;
}
export default function Edit() {
    const profile = useAuthStore((state) => state.profile);
    const [formData, setFormData] = useState<IEditForm>({
        display_name: profile?.display_name || "",
        bio: profile?.bio || "",
        avatar_url: profile?.avatar_url || "",
    });
    const addNotify = useNotifyStore((state) => state.addNotification);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile(formData);
        addNotify({
            id: new Date().getSeconds(),
            type: "success",
            description: "Your profile data updated!",
            title: "Profile",
        });
    };
    const handlePasswordChange = () => {
        resetPassword();
        alert(
            "Message with instructions to reset password was sent in your email!"
        );
    };
    return (
        <div>
            <form
                action=""
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-2">
                    <label htmlFor="userName" className="w-20">
                        Username
                    </label>
                    <input
                        type="text"
                        name="display_name"
                        id="display_name"
                        placeholder="Enter new username"
                        className="ring-1 ring-indigo-500 rounded-xs p-1.5"
                        onChange={handleChange}
                        value={formData.display_name}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="bio" className="w-20">
                        Bio
                    </label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        placeholder="Enter new bio"
                        className="ring-1 ring-indigo-500 rounded-xs p-1.5"
                        onChange={handleChange}
                        value={formData.bio}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="avatar" className="w-20">
                        Avatar
                    </label>
                    <input
                        type="text"
                        name="avatar_url"
                        id="avatar_url"
                        placeholder="Enter avatar url"
                        className="ring-1 ring-indigo-500 rounded-xs p-1.5"
                        onChange={handleChange}
                        value={formData.avatar_url}
                    />
                </div>
                <Button type="button" onClick={handlePasswordChange}>
                    Reset Password
                </Button>
                <div className="flex gap-5 items-center justify-between mt-10">
                    <Button type="submit">Save</Button>
                    <Link
                        to={"/"}
                        className=" flex items-center justify-center bg-button-background p-2 rounded-sm w-50"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProfileType } from "../../types";
import { getProfileById, updateProfileById } from "../../utils/profile";
import { useNotifyStore } from "../../stores/useNotifyStore";
import TextInputs from "../../components/AdminPanel/UserAdmin/Edit/TextInputs";
import { SelectInput } from "../../components/AdminPanel";

export default function UserEdit() {
    const { id: userId } = useParams();
    const [formData, setFormData] = useState<IProfileType>();
    const addNotify = useNotifyStore((state) => state.addNotification);
    useEffect(() => {
        (async () => {
            if (!userId) return;
            const user = await getProfileById(userId);
            if (user) {
                setFormData(user);
            }
        })();
    }, [userId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData && userId) {
            updateProfileById(userId, formData);
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: `Success update user ${formData.display_name} profile!`,
                title: "Admin Panel",
            });
        }
    };

    return (
        <div className="w-full">
            {formData && (
                <form
                    action=""
                    className="flex flex-col gap-2 justify-center bg-black/25 p-2 rounded-sm w-full"
                    onSubmit={handleSubmit}
                >
                    <TextInputs
                        display_name={formData.display_name}
                        bio={formData.bio}
                        avatar_url={formData.avatar_url}
                        handleChange={handleChange}
                    />
                    <div className="flex gap-2">
                        <label
                            htmlFor="currentModule"
                            className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                        >
                            Role
                        </label>
                        <SelectInput
                            name="role"
                            id="adminInput"
                            value={formData.role}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </SelectInput>
                    </div>
                    <div className="flex gap-2">
                        <label
                            htmlFor="userPoints"
                            className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                        >
                            Points
                        </label>
                        <input
                            type="number"
                            name="points"
                            id="userPoints"
                            placeholder="points"
                            className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background w-30 sm:w-50"
                            value={formData.points}
                            onChange={(e) => {
                                if (parseInt(e.target.value) >= 0)
                                    handleChange(e);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500/40 p-2 mt-10 mb-3 rounded-sm"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}

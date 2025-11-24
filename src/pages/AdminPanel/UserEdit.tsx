import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProfileType } from "../../types";
import { getProfileById, updateProfileById } from "../../utils/profile";
import { Input } from "../../components/AdminPanel";
import { useNotifyStore } from "../../stores/useNotifyStore";

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
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
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
                    <Input
                        placeholder="Name"
                        value={formData.display_name}
                        required={true}
                        name="display_name"
                        onChange={(e) => handleChange(e)}
                        id="nameInput"
                    />
                    <Input
                        placeholder="Avatar"
                        value={formData.avatar_url}
                        name="avatar_url"
                        onChange={(e) => handleChange(e)}
                        id="avatarInput"
                    />
                    <Input
                        placeholder="Bio"
                        value={formData.bio}
                        name="bio"
                        onChange={(e) => handleChange(e)}
                        id="bioInput"
                    />
                    <div className="flex gap-2">
                        <label
                            htmlFor="currentModule"
                            className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                        >
                            Role
                        </label>
                        <select
                            name="role"
                            id="adminInput"
                            className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background w-30 sm:w-50"
                            value={formData.role}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <label
                            htmlFor="currentModule"
                            className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                        >
                            Rank
                        </label>
                        <select
                            name="rank"
                            id="adminInput"
                            className="ring-1 ring-indigo-500 p-2 rounded-sm bg-button-background w-30 sm:w-50"
                            value={formData.rank}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        >
                            <option value="newbie">Newbie</option>
                            <option value="apprentice">Apprentice</option>
                            <option value="coder">Coder</option>
                            <option value="practitioner">Practitioner</option>
                            <option value="master">Master</option>
                            <option value="optimizer">Optimizer</option>
                            <option value="architect">Architect</option>
                            <option value="guru">Guru</option>
                            <option value="virtuoso">Virtuoso</option>
                            <option value="legend">Legend</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <label
                            htmlFor="currentModule"
                            className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                        >
                            Points
                        </label>
                        <input
                            type="number"
                            name="points"
                            id="currentModule"
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

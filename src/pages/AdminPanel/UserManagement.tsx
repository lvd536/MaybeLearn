import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfilesInRange, removeProfileById } from "../../utils/profile";
import type { IProfileType } from "../../types";
import { Pencil, Trash } from "../../assets";

export default function UserManagement() {
    const [users, setUsers] = useState<IProfileType[]>();
    const { page } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const pageNumber = parseInt(page || "1");
            const users = await getProfilesInRange(
                pageNumber === 1 ? pageNumber : (pageNumber - 1) * 10 + 1
            );
            if (users) {
                setUsers(users);
            }
        })();
    }, [page]);

    const handleRemove = (userId: number) => {
        const confirmed = confirm(`Are you sure you want to delete this user?`);

        if (confirmed) {
            removeProfileById(userId);
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-between">
            {users?.map((user) => (
                <div
                    className="flex w-full m-2 p-2 bg-catalog-card rounded-sm items-center justify-between"
                    key={user.id}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <img
                                src={user.avatar_url}
                                alt=""
                                className="w-12 rounded-full"
                            />
                            <div className="flex flex-col justify-center items-start">
                                <p className="font-medium text-sm">
                                    {user.display_name}
                                </p>
                                <p
                                    className={`flex justify-center text-xs rounded-sm p-0.5 ${
                                        user.role === "moderator"
                                            ? "bg-blue-400"
                                            : user.role === "admin"
                                            ? "bg-red-500"
                                            : "bg-green-400"
                                    }`}
                                >
                                    {user.role}
                                </p>
                            </div>
                        </div>
                        <p className="text-white/15 text-sm">
                            {new Date(user.created_at as string).toDateString()}
                        </p>
                    </div>
                    <div className="flex flex-col h-full justify-between items-end">
                        <div className="flex gap-2">
                            <button
                                className="flex items-center justify-center bg-button-background p-1 rounded-sm w-6 h-6"
                                onClick={() =>
                                    navigate(`/admin/user/edit/${user.id}`)
                                }
                            >
                                <Pencil />
                            </button>
                            <button
                                className="flex items-center justify-center bg-button-background p-1 rounded-sm w-6 h-6"
                                onClick={() => handleRemove(user.id)}
                            >
                                <Trash />
                            </button>
                        </div>
                        <p className="text-white/15 text-xs">{user.id}</p>
                    </div>
                </div>
            ))}
            <div className="flex gap-2">
                {parseInt(page || "1") > 1 && (
                    <button
                        className="flex justify-center bg-catalog-card rounded-sm p-2 w-20"
                        onClick={() =>
                            navigate(
                                `/admin/management/${parseInt(page || "1") - 1}`
                            )
                        }
                    >
                        Previous
                    </button>
                )}
                <p className="flex justify-center bg-catalog-card rounded-sm p-2 w-20">
                    Page {page}
                </p>
                {users && users.length > 9 && (
                    <button
                        className="flex justify-center bg-catalog-card rounded-sm p-2 w-20"
                        onClick={() =>
                            navigate(
                                `/admin/management/${parseInt(page || "1") + 1}`
                            )
                        }
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

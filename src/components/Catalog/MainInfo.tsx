import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "../../assets";
import { deleteCourse } from "../../stores/Catalog/useCoursesStore";
import { deleteTest } from "../../stores/Catalog/useTestsStore";
import type { ICourse, ITest } from "../../types";
import { useEffect, useState } from "react";
import { getProfileCredits } from "../../utils/profile";
import { useAuthStore } from "../../stores/useAuthStore";

interface IMainInfoProps {
    item: ICourse | ITest;
    isCompleted: boolean;
    redirectTo: "course" | "test";
}

export default function MainInfo({
    item,
    isCompleted,
    redirectTo,
}: IMainInfoProps) {
    const [userCredits, setUserCredits] = useState<{
        name: string;
        avatar: string;
        role: string;
    } | null>();
    const navigate = useNavigate();
    const profile = useAuthStore((state) => state.profile);
    const isAdmin = profile?.role === "admin" || profile?.role === "moderator";
    const handleEdit = () => navigate(`/admin/${redirectTo}/${item.id}`);

    const handleRemove = () => {
        const confirmed = confirm(
            `Are you sure you want to delete ${redirectTo}?`
        );

        if (confirmed) {
            if (redirectTo === "course") deleteCourse(item.id);
            else deleteTest(item.id);
        }
    };

    useEffect(() => {
        async function getUserProfileCredits() {
            const credits = await getProfileCredits(item.author_id);
            setUserCredits(credits);
        }
        getUserProfileCredits();
    }, [item.author_id]);

    return (
        <div className="flex flex-col justify-between gap-3">
            <span
                className={`font-normal text-sm ${
                    item.data.level === "Easy"
                        ? "text-green-400/80"
                        : item.data.level === "Middle"
                        ? "text-amber-400/80"
                        : "text-red-500/80"
                }`}
            >
                {item.data.level}
            </span>
            <span className="flex gap-2 items-center font-bold text-base">
                {item.data.title}
                {isCompleted && (
                    <div className="text-[10px] font-normal rounded-xl bg-green-500 p-1">
                        Completed
                    </div>
                )}
                {isAdmin && (
                    <div className="flex ml-2 gap-2">
                        <button onClick={handleEdit}>
                            <Pencil />
                        </button>
                        <button onClick={handleRemove}>
                            <Trash />
                        </button>
                    </div>
                )}
            </span>
            <span className="font-normal text-sm text-card">
                {item.data.description}
            </span>
            <div className="flex items-center gap-2">
                {userCredits?.avatar && (
                    <img
                        src={userCredits?.avatar}
                        alt=""
                        className="rounded-full w-6 h-6"
                    />
                )}
                <span className="font-normal text-sm text-card">
                    {userCredits?.name}
                </span>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-indigo-500/50 rounded-full" />
                    <span className="font-medium text-xs text-white/40">
                        {new Date(item.created_at).toDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

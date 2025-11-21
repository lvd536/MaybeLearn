import { Link, useNavigate } from "react-router-dom";
import { CatalogCardImage, Trash } from "../../assets/";
import { useEffect, useState } from "react";
import { getProfileCredits } from "../../utils/profile";
import type { ICourse, ITest } from "../../types";
import Pencil from "../../assets/Pencil";
import { setCourseId } from "../../stores/Catalog/Creation/useCourseCreationStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { setTestId } from "../../stores/Catalog/Creation/useTestCreationStore";
import { deleteCourse } from "../../stores/Catalog/useCoursesStore";
import { deleteTest } from "../../stores/Catalog/useTestsStore";

type CatalogCardProps = {
    item: ICourse | ITest;
    isCompleted: boolean;
    redirectTo: "test" | "course";
};

export default function CatalogCard({
    item,
    isCompleted,
    redirectTo,
}: CatalogCardProps) {
    const [userCredits, setUserCredits] = useState<{
        name: string;
        avatar: string;
        role: string;
    } | null>();
    const profile = useAuthStore((state) => state.profile);
    const isAdmin = profile?.role === "admin" || profile?.role === "moderator";
    const navigate = useNavigate();

    const handleEdit = () => {
        if (redirectTo === "course") {
            setCourseId(item.id);
            navigate("/admin");
        }
        if (redirectTo === "test") {
            setTestId(item.id);
            navigate("/admin");
        }
    };

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
    console.log(item);
    return (
        <li
            className={`flex items-center justify-between transition-bg duration-500 ${
                !isCompleted
                    ? "bg-catalog-card"
                    : "bg-green-900/20 text-white/50"
            } rounded-sm p-4`}
        >
            <div className="flex flex-col items-baseline justify-between gap-15">
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
                    </div>
                </div>
                {isCompleted ? (
                    <span className="bg-button-background/70 py-2 px-3 rounded-xl cursor-not-allowed">
                        Completed
                    </span>
                ) : (
                    <Link
                        to={`/catalog/${redirectTo}`}
                        className="bg-button-background py-2 px-3 rounded-xl"
                        onClick={() => {
                            localStorage.setItem(
                                `${redirectTo}Id`,
                                item.id.toString()
                            );
                        }}
                    >
                        Start
                    </Link>
                )}
            </div>
            <img
                src={item.data.image || CatalogCardImage}
                alt=""
                loading="lazy"
                className="hidden sm:flex rounded-xl w-[309px] h-[165px] object-cover transition-shadow duration-300 hover:shadow-catalog-card"
            />
        </li>
    );
}

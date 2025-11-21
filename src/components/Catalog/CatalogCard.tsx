import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileCredits } from "../../utils/profile";
import type { ICourse, ITest } from "../../types";
import { setCourseId } from "../../stores/Catalog/Creation/useCourseCreationStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { setTestId } from "../../stores/Catalog/Creation/useTestCreationStore";
import { deleteCourse } from "../../stores/Catalog/useCoursesStore";
import { deleteTest } from "../../stores/Catalog/useTestsStore";
import MainInfo from "./MainInfo";
import StartButton from "./StartButton";
import CatalogImage from "./CatalogImage";

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
                <MainInfo
                    itemData={item.data}
                    userCredits={userCredits}
                    isCompleted={isCompleted}
                    isAdmin={isAdmin}
                    handleEdit={handleEdit}
                    handleRemove={handleRemove}
                />
                <StartButton
                    isCompleted={isCompleted}
                    redirectTo={redirectTo}
                    itemId={item.id.toString()}
                />
            </div>
            <CatalogImage image={item.data.image} />
        </li>
    );
}

import { Link } from "react-router-dom";
import { CatalogCardImage } from "../../assets/";
import { useEffect, useState } from "react";
import { getProfileCredits } from "../../utils/profile";
import type { ICourse, ITest } from "../../types";

type CatalogCardProps = {
    item: ICourse | ITest;
    isCompleted: boolean;
    redirectTo: string;
};

export default function CatalogCard({
    item,
    isCompleted,
    redirectTo,
}: CatalogCardProps) {
    const [userCredits, setUserCredits] = useState<{
        name: string;
        avatar: string;
    } | null>();

    useEffect(() => {
        async function getUserProfileCredits() {
            const credits = await getProfileCredits(item.author_id);
            setUserCredits(credits);
        }
        getUserProfileCredits();
    }, [item.author_id]);

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
                    <span className="font-normal text-sm text-card">
                        {item.data.level}
                    </span>
                    <span className="flex gap-2 items-center font-bold text-base">
                        {item.data.title}
                        {isCompleted && (
                            <div className="text-[10px] font-normal rounded-xl bg-green-500 p-1">
                                Completed
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
            <img src={CatalogCardImage} alt="" loading="lazy" />
        </li>
    );
}

import { Link } from "react-router-dom";
import CatalogCardImage from "../../assets/CatalogCardImage.png";

export default function CatalogCard({
    level,
    title,
    description,
    id,
    isCompleted,
    redirectTo,
}: {
    level: string;
    title: string;
    description: string;
    id: number;
    isCompleted: boolean;
    redirectTo: string;
}) {
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
                        {level}
                    </span>
                    <span className="flex gap-2 items-center font-bold text-base">
                        {title}
                        {isCompleted && (
                            <div className="text-[10px] font-normal rounded-xl bg-green-500 p-1">
                                Completed
                            </div>
                        )}
                    </span>
                    <span className="font-normal text-sm text-card">
                        {description}
                    </span>
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
                                id.toString()
                            );
                        }}
                    >
                        Start
                    </Link>
                )}
            </div>
            <img src={CatalogCardImage} alt="" />
        </li>
    );
}

import type { ICourse, ITest } from "../../types";
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
                    item={item}
                    isCompleted={isCompleted}
                    redirectTo={redirectTo}
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

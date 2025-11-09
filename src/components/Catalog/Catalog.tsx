import CatalogCard from "./CatalogCard";
import type { ICompletedItem, ICourse, ITest } from "../../types";
import { useEffect, useState } from "react";
import { getTestCompletionData } from "../../utils/test";
import { getCourseCompletionData } from "../../utils/course";
import Search from "../../assets/Search";
export default function Catalog({
    title,
    description,
    redirectTo,
    items,
}: {
    title: string;
    description: string;
    redirectTo: string;
    items: ICourse[] | ITest[];
}) {
    const [completedItems, setCompletedItems] = useState<ICompletedItem[]>([]);
    useEffect(() => {
        (async () => {
            const data =
                redirectTo === "course"
                    ? await getCourseCompletionData()
                    : await getTestCompletionData();
            setCompletedItems(data || []);
        })();
    }, []);

    const isCompletedCheck = (item: ICourse | ITest) => {
        const completedCheck =
            redirectTo === "course"
                ? completedItems.map((i) => i.lesson_id).includes(item.id)
                : completedItems.map((i) => i.test_id).includes(item.id);
        return completedCheck;
    };

    return (
        <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <span className="font-normal text-base text-card mt-4">
                {description}
            </span>
            <div className="flex gap-2 items-center justify-between">
                <input
                    type="search"
                    name={`${title}SearchBar`}
                    id={`${title}SearchBar`}
                    placeholder={`Search ${title}`}
                    className="rounded-sm bg-button-background mt-3 max-h-10 mb-10 p-2 w-full"
                />
                <button className="bg-button-background p-2 rounded-xs">
                    <Search />
                </button>
            </div>
            <ul className="flex flex-col gap-5">
                {items.map((item) => (
                    <CatalogCard
                        level={item.data.level}
                        title={item.data.title}
                        description={item.data.description}
                        id={item.id}
                        redirectTo={redirectTo}
                        key={item.id}
                        isCompleted={isCompletedCheck(item)}
                    />
                ))}
            </ul>
        </div>
    );
}

import CatalogCard from "./CatalogCard";
import type { ICompletedItem, ICourse, ITest } from "../../types";
import { useEffect, useState } from "react";
import { getTestCompletionData } from "../../utils/test";
import { getCourseCompletionData } from "../../utils/course";

type Catalog = {
    title: string;
    description: string;
    redirectTo: string;
    items: ICourse[] | ITest[];
};
export default function Catalog({
    title,
    description,
    redirectTo,
    items,
}: Catalog) {
    const [completedItems, setCompletedItems] = useState<ICompletedItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<ICourse[] | ITest[]>([]);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    useEffect(() => {
        (async () => {
            const data =
                redirectTo === "course"
                    ? await getCourseCompletionData()
                    : await getTestCompletionData();
            setCompletedItems(data || []);
        })();
    }, [redirectTo]);

    const isCompletedCheck = (item: ICourse | ITest) => {
        const completedCheck =
            redirectTo === "course"
                ? completedItems.findIndex((i) => i.lesson_id === item.id) !==
                  -1
                : completedItems.findIndex((i) => i.test_id === item.id) !== -1;
        return completedCheck;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setFilteredItems(
            items.filter((item) =>
                item.data.title.toLowerCase().includes(value)
            ) as ICourse[] | ITest[]
        );
    };

    return (
        <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <span className="font-normal text-base text-card mt-4">
                {description}
            </span>
            <div className="flex gap-2 my-5 items-center justify-between">
                <input
                    type="search"
                    name={`${title}SearchBar`}
                    id={`${title}SearchBar`}
                    placeholder={`Search ${title}`}
                    className="rounded-sm bg-button-background p-2 w-full h-10"
                    onChange={handleChange}
                />
            </div>
            <ul className="flex flex-col gap-5">
                {filteredItems.map((item) => (
                    <CatalogCard
                        item={item}
                        redirectTo={redirectTo}
                        key={item.id}
                        isCompleted={isCompletedCheck(item)}
                    />
                ))}
            </ul>
        </div>
    );
}

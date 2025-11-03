import CatalogCard from "./CatalogCard";
import type { ICourse } from "../../types";
export default function Catalog({
    title,
    description,
    redirectTo,
    items,
}: {
    title: string;
    description: string;
    redirectTo: string;
    items: ICourse[];
}) {
    return (
        <div>
            <h1 className="font-bold text-3xl">{title}</h1>
            <span className="font-normal text-base text-card mt-4">
                {description}
            </span>
            <input
                type="search"
                name={`${title}SearchBar`}
                id={`${title}SearchBar`}
                placeholder={`Search ${title}`}
                className="w-full rounded-sm bg-button-background mt-3 mb-10 p-2"
            />
            <ul className="flex flex-col gap-5">
                {items.map((item) => (
                    <CatalogCard
                        level={item.data.level}
                        title={item.data.title}
                        description={item.data.description}
                        id={item.id}
                        redirectTo={redirectTo}
                        key={item.id}
                    />
                ))}
            </ul>
        </div>
    );
}

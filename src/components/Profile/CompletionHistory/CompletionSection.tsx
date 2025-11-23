import { useEffect, useState } from "react";
import { getCourses } from "../../../stores/Catalog/useCoursesStore";
import type { ICompletedItem, ICourse, ITest } from "../../../types";
import CompletionItem from "./CompletionItem";
import { getTests } from "../../../stores/Catalog/useTestsStore";

interface ICompletionSectionProps {
    type: "course" | "test";
    completedItems: ICompletedItem[];
}

export default function CompletionSection({
    type,
    completedItems,
}: ICompletionSectionProps) {
    const [items, setItems] = useState<
        { item: ICourse | ITest; completed_at: Date }[]
    >([]);
    useEffect(() => {
        (async () => {
            const items = type === "course" ? getCourses() : getTests();
            if (!items || !completedItems) return;
            const itemHistory = items
                .map((item) => {
                    const element = completedItems?.find(
                        (c) =>
                            (type === "course" ? c.lesson_id : c.test_id) ==
                            item.id
                    );
                    if (element) {
                        return {
                            item: item,
                            completed_at: new Date(element.created_at),
                        };
                    }
                })
                .filter((c) => c !== undefined);
            setItems(itemHistory);
        })();
    }, [type, completedItems]);
    return (
        <>
            {items.length > 0 ? (
                <>
                    <h1 className="font-bold text-xl my-5">
                        {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                        Completion History
                    </h1>
                    <div className="grid sm:grid-cols-2 flex-col gap-5">
                        {items.map((item) => (
                            <CompletionItem key={item.item.id} item={item} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="font-bold text-xl my-10">
                    You haven't completed any {type}s yet.
                </p>
            )}
        </>
    );
}

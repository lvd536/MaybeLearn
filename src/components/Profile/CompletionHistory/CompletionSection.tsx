import { useEffect, useState } from "react";
import { getCourses } from "../../../stores/Catalog/useCoursesStore";
import type { ICourse, ITest } from "../../../types";
import { getCourseCompletionData } from "../../../utils/course";
import CompletionItem from "./CompletionItem";
import { getTestCompletionData } from "../../../utils/test";
import { getTests } from "../../../stores/Catalog/useTestsStore";

export default function CompletionSection({type}: {type: "course" | "test"}) {
    const [items, setItems] = useState<
        { item: ICourse | ITest; completed_at: Date }[]
    >([]);
    useEffect(() => {
        (async () => {
            const completedItems = type === 'course' ? await getCourseCompletionData() : await getTestCompletionData();
            const items = type === 'course' ? getCourses() : getTests();
            const itemHistory = items
                .map((item) => {
                    const element = completedItems?.find(
                        (c) => (type === 'course' ? c.lesson_id : c.test_id) == item.id
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
    }, []);
    return (
        <>
            <h1 className="font-bold text-2xl my-5">
                {type.charAt(0).toUpperCase() + type.slice(1)} Completion History
            </h1>
            {items ? (
                <div className="grid grid-cols-2 flex-col gap-5">
                    {items.map((item) => (
                        <CompletionItem key={item.item.id} item={item} />
                    ))}
                </div>
            ) : (
                `You haven't completed any ${type}s yet.`
            )}
        </>
    );
}

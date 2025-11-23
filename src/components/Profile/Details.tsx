import { useEffect, useState } from "react";
import type { ICompletedItem } from "../../types";
import { getCourseCompletionData } from "../../utils/course";
import { getTestCompletionData } from "../../utils/test";
import CompletionSection from "./CompletionHistory/CompletionSection";
import Stats from "./Stats";

export default function Details() {
    const [completedTests, setCompletedTests] = useState<ICompletedItem[]>([]);
    const [completedCourses, setCompletedCourses] = useState<ICompletedItem[]>(
        []
    );

    useEffect(() => {
        (async () => {
            const tests = await getTestCompletionData();
            const courses = await getCourseCompletionData();

            if (tests && courses) {
                setCompletedTests(tests);
                setCompletedCourses(courses);
            }
        })();
    }, []);

    return (
        <>
            <Stats
                completedCourses={completedCourses.length}
                completedTests={completedTests.length}
            />
            <CompletionSection
                type="course"
                completedItems={completedCourses}
                key={"course"}
            />
            <CompletionSection
                type="test"
                completedItems={completedTests}
                key={"test"}
            />
        </>
    );
}

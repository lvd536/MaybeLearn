import { addNewCourse, updateCourseById } from "../../../utils/course";
import {
    getCourseTemplate,
    getCurrentModule,
    setCourseTemplate,
    resetCourseTemplate,
} from "../../../stores/Catalog/Creation/useCourseCreationStore";
import { getCourseById } from "../../../stores/Catalog/useCoursesStore";
import { useEffect, useRef, useState } from "react";
import { useNotifyStore } from "../../../stores/useNotifyStore";
import CourseControls from "./CourseControls";
import MainInfo from "./MainInfo";
import Module from "./Module";

interface ICourseCreationProps {
    courseId: number | null;
}

export default function CourseCreation({ courseId }: ICourseCreationProps) {
    const coursesTemplate = getCourseTemplate();
    const currentModule = getCurrentModule();
    const [originalCourseId, setOriginalCourseId] = useState<number | null>(
        null
    );
    const initialCourseIdRef = useRef<number | null>(courseId);
    const addNotify = useNotifyStore((state) => state.addNotification);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (originalCourseId) {
            updateCourseById(coursesTemplate, originalCourseId);
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: `Edit course with id ${originalCourseId} success`,
                title: "Course Creation",
            });
        } else if (!originalCourseId) {
            addNewCourse(coursesTemplate);
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: "Success course creation",
                title: "Course Creation",
            });
        }
    }
    useEffect(() => {
        const currentCourseId = initialCourseIdRef.current;
        if (currentCourseId) {
            const test = getCourseById(currentCourseId);
            if (test) {
                setOriginalCourseId(currentCourseId);
                setCourseTemplate(test.data);
            }
        } else {
            resetCourseTemplate();
        }
    }, []);
    return (
        <>
            <CourseControls
                currentModule={currentModule}
                modulesLength={coursesTemplate.modules.length}
            />
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center bg-black/25 p-2 rounded-sm w-full"
                onSubmit={handleSubmit}
            >
                <MainInfo
                    description={coursesTemplate.description}
                    level={coursesTemplate.level}
                    title={coursesTemplate.title}
                />
                <div className="grid grid-cols-2 gap-8 w-full">
                    {coursesTemplate.modules.map((module, moduleIndex) => (
                        <Module
                            module={module}
                            moduleIndex={moduleIndex}
                            key={moduleIndex}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="p-2 bg-button-background rounded-sm my-5 shadow-2xs shadow-indigo-500"
                >
                    {originalCourseId ? "Edit" : "Create"} course
                </button>
            </form>
        </>
    );
}

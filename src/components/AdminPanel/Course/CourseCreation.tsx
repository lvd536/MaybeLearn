import { addNewCourse, updateCourseById } from "../../../utils/course";
import {
    getCourseTemplate,
    getCurrentModule,
    setCourseTemplate,
    resetCourseTemplate,
} from "../../../stores/Catalog/Creation/useCourseCreationStore";
import { getCourseById } from "../../../stores/Catalog/useCoursesStore";
import { useEffect, useMemo } from "react";
import { useNotifyStore } from "../../../stores/useNotifyStore";
import CourseControls from "./CourseControls";
import MainInfo from "./MainInfo";
import Module from "./Module";
import { useParams } from "react-router-dom";

export default function CourseCreation() {
    const { id: courseId } = useParams();
    const coursesTemplate = getCourseTemplate();
    const modules = useMemo(
        () =>
            coursesTemplate.modules.map((module, moduleIndex) => (
                <Module
                    module={module}
                    moduleIndex={moduleIndex}
                    key={moduleIndex}
                />
            )),
        [coursesTemplate.modules]
    );
    const currentModule = getCurrentModule();
    const addNotify = useNotifyStore((state) => state.addNotification);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (courseId) {
            updateCourseById(coursesTemplate, parseInt(courseId));
            addNotify({
                id: new Date().getSeconds(),
                type: "success",
                description: `Edit course with id ${courseId} success`,
                title: "Course Creation",
            });
        } else if (!courseId) {
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
        if (courseId) {
            const course = getCourseById(parseInt(courseId));
            if (course) {
                setCourseTemplate(course.data);
            }
        } else {
            resetCourseTemplate();
        }
    }, [courseId]);
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
                    image={coursesTemplate.image || ""}
                />
                <div className="grid grid-cols-2 gap-8 w-full">{modules}</div>
                <button
                    type="submit"
                    className="p-2 bg-button-background rounded-sm my-5 shadow-2xs shadow-indigo-500"
                >
                    {courseId ? "Edit" : "Create"} course
                </button>
            </form>
        </>
    );
}

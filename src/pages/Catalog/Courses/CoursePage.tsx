import ModuleTitle from "../../../components/Catalog/ModuleTitle";
import Text from "../../../components/Catalog/Text";
import ParagraphTitle from "../../../components/Catalog/ParagraphTitle";
import { useState } from "react";
import { getCourse } from "../../../stores/useCoursesStore";

export default function CoursePage() {
    const activeCourseId = parseInt(localStorage.getItem("catalogId") ?? "1");
    const courseData = getCourse(activeCourseId);
    const [activeModule, setActiveModule] = useState<string | undefined>(
        courseData?.data.modules[0].title
    );
    return (
        <>
            {courseData ? (
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col w-1/6 gap-4">
                        {courseData.data.modules.map((module, index) => (
                            <button
                                className={`flex items-start font-medium text-sm p-2 transition-all duration-600 rounded-xl ${
                                    activeModule === module.title &&
                                    "bg-button-background"
                                }`}
                                onClick={() => setActiveModule(module.title)}
                                key={index}
                            >
                                {module.title}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col w-5/6 gap-4">
                        <ModuleTitle>{courseData.data.title}</ModuleTitle>
                        <Text>{courseData.data.description}</Text>
                        {courseData.data.modules
                            .find((module) => module.title === activeModule)
                            ?.lessons.map((lesson, index) => (
                                <div key={index}>
                                    <ParagraphTitle>
                                        {lesson.title}
                                    </ParagraphTitle>
                                    <Text>{lesson.content}</Text>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                "Loading course..."
            )}
        </>
    );
}

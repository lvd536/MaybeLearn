import { Text, ModuleTitle } from "../../../components/Catalog/";
import { useEffect, useState } from "react";
import { getCourse } from "../../../stores/Catalog/useCoursesStore";
import { sendCourseCompletionData } from "../../../utils/course";
import NavItem from "../../../components/Catalog/PageComponents/Course/NavItem";
import CongratsPage from "../../../components/Catalog/PageComponents/CongratsPage";
import Lesson from "../../../components/Catalog/PageComponents/Course/Lesson";
import { useParams } from "react-router-dom";

export default function CoursePage() {
    const { id } = useParams();
    const courseData = getCourse(parseInt(id || "1"));

    const [activeModule, setActiveModule] = useState<string | undefined>(
        courseData?.data.modules[0].title
    );
    const [finishedTitles, setFinishedTitles] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const setNewFinishedTitles = (id: string) => {
        if (finishedTitles.includes(id)) {
            setFinishedTitles(
                finishedTitles.filter((finishedId) => finishedId !== id)
            );
        } else {
            setFinishedTitles([...finishedTitles, id]);
        }
    };
    useEffect(() => {
        (async () => {
            if (isCompleted)
                await sendCourseCompletionData(courseData?.id || 1, 100);
        })();
    }, [isCompleted, courseData?.id]);
    return (
        <>
            {courseData && !isCompleted ? (
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col w-1/6 gap-4">
                        {courseData.data.modules.map((module, index) => (
                            <NavItem
                                title={module.title}
                                index={index}
                                isActive={activeModule === module.title}
                                isFinished={finishedTitles.includes(
                                    module.title
                                )}
                                setNewFinishedTitles={setNewFinishedTitles}
                                setActiveModule={setActiveModule}
                                key={index}
                            />
                        ))}
                        <button
                            className="font-medium bg-button-background rounded-xs mt-5 p-2"
                            onClick={() => setIsCompleted(true)}
                        >
                            Complete course
                        </button>
                    </div>
                    <div className="flex flex-col w-5/6 gap-4">
                        <ModuleTitle>{courseData.data.title}</ModuleTitle>
                        <Text>{courseData.data.description}</Text>
                        {courseData.data.modules
                            .find((module) => module.title === activeModule)
                            ?.lessons.map((lesson, index) => (
                                <Lesson
                                    index={index}
                                    lesson={lesson}
                                    key={index}
                                />
                            ))}
                    </div>
                </div>
            ) : courseData && isCompleted ? (
                <CongratsPage title={courseData.data.title} type='course' points={100}/>
            ) : (
                "Loading course..."
            )}
        </>
    );
}

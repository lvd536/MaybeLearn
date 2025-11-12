import {
    Text,
    ParagraphTitle,
    ModuleTitle,
} from "../../../components/Catalog/";
import { useEffect, useState } from "react";
import { getCourse } from "../../../stores/Catalog/useCoursesStore";
import { Check, Congrats } from "../../../assets/";
import { Link } from "react-router-dom";
import { sendCourseCompletionData } from "../../../utils/course";

export default function CoursePage() {
    const activeCourseId = parseInt(localStorage.getItem("courseId") ?? "1");
    const courseData = getCourse(activeCourseId);

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
                            <div className="flex gap-2" key={index}>
                                <button
                                    className={`flex w-100 items-start justify-between font-medium text-sm p-2 transition-all duration-600 rounded-xl ${
                                        finishedTitles.includes(module.title)
                                            ? "bg-green-300/50"
                                            : activeModule === module.title
                                            ? "bg-button-background"
                                            : "bg-button-background/30"
                                    }`}
                                    onClick={() => {
                                        if (
                                            !finishedTitles.includes(
                                                module.title
                                            )
                                        ) {
                                            setActiveModule(module.title);
                                        }
                                    }}
                                    key={index}
                                >
                                    {module.title}
                                </button>
                                <button
                                    onClick={() =>
                                        setNewFinishedTitles(module.title)
                                    }
                                >
                                    <Check />
                                </button>
                            </div>
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
                                <div key={index}>
                                    <ParagraphTitle>
                                        {lesson.title}
                                    </ParagraphTitle>
                                    <Text>{lesson.content}</Text>
                                </div>
                            ))}
                    </div>
                </div>
            ) : courseData && isCompleted ? (
                <div className="flex flex-col gap-5 justify-start items-center h-screen">
                    <h1 className="text-2xl font-bold">Congratulations!</h1>
                    <span className="text-xl font-medium">
                        Course {courseData.data.title} is completed
                    </span>
                    <span>You earn fixed 100 points!</span>
                    <img
                        src={Congrats}
                        alt="congratulations image"
                        className="max-w-100"
                        loading="lazy"
                    />
                    <Link
                        to={"/"}
                        className="flex items-center justify-center text-xl font-medium rounded-xl bg-button-background py-2 px-10"
                    >
                        Home Page
                    </Link>
                </div>
            ) : (
                "Loading course..."
            )}
        </>
    );
}

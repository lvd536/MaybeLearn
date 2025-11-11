import { useState } from "react";
import type { ICourseData } from "../../../types";
import { addNewCourse } from "../../../utils/course";

const initialTemplate: ICourseData = {
    title: "",
    level: "",
    description: "",
    // image: "",
    modules: [
        {
            title: "",
            lessons: [
                {
                    title: "i",
                    content: "",
                },
            ],
        },
    ],
};

export default function CourseCreation() {
    const [coursesTemplate, setCoursesTemplate] =
        useState<ICourseData>(initialTemplate);
    const [currentModule, setCurrentModule] = useState<number>(0);
    function addModule() {
        setCoursesTemplate({
            ...coursesTemplate,
            modules: [
                ...coursesTemplate.modules,
                {
                    title: "",
                    lessons: [
                        {
                            title: "",
                            content: "",
                        },
                    ],
                },
            ],
        });
    }
    function removeModule() {
        if (coursesTemplate.modules.length === 1) return;

        setCoursesTemplate({
            ...coursesTemplate,
            modules: coursesTemplate.modules.slice(
                0,
                coursesTemplate.modules.length - 1
            ),
        });
    }
    function setCourseInfo(name: string, value: string) {
        setCoursesTemplate({
            ...coursesTemplate,
            [name]: value,
        });
    }
    function setLessonInfo(
        moduleIndex: number,
        lessonIndex: number,
        name: string,
        value: string
    ) {
        setCoursesTemplate({
            ...coursesTemplate,
            modules: coursesTemplate.modules.map((module, index) =>
                index === moduleIndex
                    ? {
                          ...module,
                          lessons: module.lessons.map((lesson, index) =>
                              index === lessonIndex
                                  ? { ...lesson, [name]: value }
                                  : lesson
                          ),
                      }
                    : module
            ),
        });
    }
    function setModuleInfo(moduleIndex: number, name: string, value: string) {
        setCoursesTemplate((prevTemplate) => ({
            ...prevTemplate,
            modules: prevTemplate.modules.map((module, index) =>
                index === moduleIndex ? { ...module, [name]: value } : module
            ),
        }));
    }
    function addLesson() {
        setCoursesTemplate({
            ...coursesTemplate,
            modules: coursesTemplate.modules.map((module, index) =>
                index === currentModule
                    ? {
                          ...module,
                          lessons: [
                              ...module.lessons,
                              {
                                  title: "",
                                  content: "",
                              },
                          ],
                      }
                    : module
            ),
        });
    }
    function removeLesson() {
        if (coursesTemplate.modules[currentModule].lessons.length === 1) return;

        setCoursesTemplate({
            ...coursesTemplate,
            modules: coursesTemplate.modules.map((module, index) =>
                index === currentModule
                    ? {
                          ...module,
                          lessons: module.lessons.slice(
                              0,
                              module.lessons.length - 1
                          ),
                      }
                    : module
            ),
        });
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addNewCourse(coursesTemplate);
    }
    return (
        <>
            <div className="flex items-center justify-center gap-5 my-3">
                <div className="flex flex-col gap-2 items-center">
                    <button
                        className="bg-black/30 p-2 rounded-sm w-50"
                        onClick={removeModule}
                    >
                        Remove module -
                    </button>
                    <button
                        className="bg-black/30 p-2 rounded-sm w-50"
                        onClick={removeLesson}
                    >
                        Remove lesson -
                    </button>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <span className="flex items-center justify-center bg-black/30 p-2 rounded-sm w-50">
                        Course Creation
                    </span>
                    <input
                        type="number"
                        name="currentModule"
                        id="currentModule"
                        placeholder="moduleId"
                        className="bg-black/30 p-2 rounded-sm w-50"
                        value={currentModule}
                        onChange={(e) => {
                            if (
                                parseInt(e.target.value) <
                                    coursesTemplate.modules.length &&
                                parseInt(e.target.value) >= 0
                            ) {
                                setCurrentModule(parseInt(e.target.value));
                            }
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <button
                        className="bg-black/30 p-2 rounded-sm w-50"
                        onClick={addModule}
                    >
                        Add module +
                    </button>
                    <button
                        className="bg-black/30 p-2 rounded-sm w-50"
                        onClick={addLesson}
                    >
                        Add lesson +
                    </button>
                </div>
            </div>
            <form
                action=""
                className="flex flex-col gap-2 items-center justify-center bg-black/25 p-2 rounded-sm w-full"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2 mb-5">
                    <h1>Main Info</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        value={coursesTemplate.title}
                        onChange={(e) => {
                            setCourseInfo("title", e.target.value);
                        }}
                        className="ring-1 ring-indigo-500 p-2 rounded-sm"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Level"
                        value={coursesTemplate.level}
                        onChange={(e) => {
                            setCourseInfo("level", e.target.value);
                        }}
                        className="ring-1 ring-indigo-500 p-2 rounded-sm"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={coursesTemplate.description}
                        onChange={(e) => {
                            setCourseInfo("description", e.target.value);
                        }}
                        className="ring-1 ring-indigo-500 p-2 rounded-sm"
                        required
                    />
                </div>
                {/* <input
                    type="text"
                    placeholder="Image URL"
                    value={coursesTemplate.image}
                    onChange={(e) => {
                        setCourseInfo("image", e.target.value);
                    }}
                    required
                /> */}
                <div className="grid grid-cols-2 gap-8 w-full">
                    {coursesTemplate.modules.map((module, moduleIndex) => (
                        <div
                            key={moduleIndex}
                            className="flex flex-col bg-button-background p-5 rounded-sm shadow-2xl shadow-button-background"
                        >
                            <h3 className="text-lg self-center mt-2 mb-1">
                                Module {moduleIndex + 1}
                            </h3>
                            <input
                                type="text"
                                placeholder="Module Title"
                                value={
                                    coursesTemplate.modules[moduleIndex].title
                                }
                                onChange={(e) => {
                                    setModuleInfo(
                                        moduleIndex,
                                        "title",
                                        e.target.value
                                    );
                                }}
                                className="ring-1 ring-indigo-500 p-2 rounded-sm"
                                required
                            />
                            {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                    key={lessonIndex}
                                    className="flex flex-col gap-2"
                                >
                                    <h3 className="self-center mt-5">
                                        Lesson {lessonIndex + 1}
                                    </h3>
                                    <input
                                        type="text"
                                        placeholder="Lesson Title"
                                        value={
                                            coursesTemplate.modules[moduleIndex]
                                                .lessons[lessonIndex].title
                                        }
                                        onChange={(e) => {
                                            setLessonInfo(
                                                moduleIndex,
                                                lessonIndex,
                                                "title",
                                                e.target.value
                                            );
                                        }}
                                        className="ring-1 ring-indigo-500 p-2 rounded-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Lesson Content"
                                        value={
                                            coursesTemplate.modules[moduleIndex]
                                                .lessons[lessonIndex].content
                                        }
                                        onChange={(e) => {
                                            setLessonInfo(
                                                moduleIndex,
                                                lessonIndex,
                                                "content",
                                                e.target.value
                                            );
                                        }}
                                        className="ring-1 ring-indigo-500 p-2 rounded-sm"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="p-2 bg-button-background rounded-sm my-5 shadow-2xs shadow-indigo-500"
                >
                    Create course
                </button>
            </form>
        </>
    );
}

import { useState } from "react";

type CourseTemplate = {
    title: string;
    level: string;
    description: string;
    image: string;
    lessons: {
        title: string;
        content: string;
    }[];
};

const initialModule = {
    title: "",
    content: "",
};

const initialTemplate: CourseTemplate = {
    title: "",
    level: "",
    description: "",
    image: "",
    lessons: [
        {
            ...initialModule,
        },
    ],
};

export default function CourseCreation() {
    const [coursesTemplate, setCoursesTemplate] =
        useState<CourseTemplate>(initialTemplate);
    function addModule() {
        setCoursesTemplate({
            ...coursesTemplate,
            lessons: [
                ...coursesTemplate.lessons,
                {
                    ...initialModule,
                },
            ],
        });
    }
    function removeModule() {
        if (coursesTemplate.lessons.length === 1) return;

        setCoursesTemplate({
            ...coursesTemplate,
            lessons: coursesTemplate.lessons.slice(
                0,
                coursesTemplate.lessons.length - 1
            ),
        });
    }
    function setCourseInfo(name: string, value: string) {
        setCoursesTemplate({
            ...coursesTemplate,
            [name]: value,
        });
    }
    function setLessonInfo(lessonIndex: number, name: string, value: string) {
        setCoursesTemplate((prevTemplate) => ({
            ...prevTemplate,
            lessons: prevTemplate.lessons.map((lesson, index) =>
                index === lessonIndex ? { ...lesson, [name]: value } : lesson
            ),
        }));
    }
    return (
        <>
            <div className="flex items-center justify-center gap-5 my-3">
                <button
                    className="bg-black/30 p-2 rounded-sm"
                    onClick={removeModule}
                >
                    Remove lesson -
                </button>
                <span className=" bg-black/30 p-3 rounded-sm">
                    Course Creation
                </span>
                <button
                    className="bg-black/30 p-2 rounded-sm"
                    onClick={addModule}
                >
                    Add lesson +
                </button>
            </div>
            <form action="" className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Title"
                    value={coursesTemplate.title}
                    onChange={(e) => {
                        setCourseInfo("title", e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Level"
                    value={coursesTemplate.level}
                    onChange={(e) => {
                        setCourseInfo("level", e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={coursesTemplate.description}
                    onChange={(e) => {
                        setCourseInfo("description", e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={coursesTemplate.image}
                    onChange={(e) => {
                        setCourseInfo("image", e.target.value);
                    }}
                />
                {coursesTemplate.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex flex-col">
                        <h3 className="mt-2 mb-1">Lesson {lessonIndex + 1}</h3>
                        <input
                            type="text"
                            placeholder="Module Title"
                            value={coursesTemplate.lessons[lessonIndex].title}
                            onChange={(e) => {
                                setLessonInfo(
                                    lessonIndex,
                                    "title",
                                    e.target.value
                                );
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Module Content"
                            value={coursesTemplate.lessons[lessonIndex].content}
                            onChange={(e) => {
                                setLessonInfo(
                                    lessonIndex,
                                    "content",
                                    e.target.value
                                );
                            }}
                        />
                    </div>
                ))}
            </form>
        </>
    );
}
